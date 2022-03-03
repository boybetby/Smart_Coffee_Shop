const fs = require('fs');
const faceapi = require('face-api.js');
const canvas = require('canvas')

const  studentModel = require('../models/student') 
const  classModel = require('../models/class') 

const { Canvas, Image, ImageData } = canvas

faceapi.env.monkeyPatch({ Image, Canvas, ImageData })

const dir = './uploads'
const files = fs.readdirSync(dir)

async function loadTrainingData(){
    const faceDescriptors = []

    for(const file of files){
        const descriptors = []
        const imagefolders = fs.readdirSync(`./uploads/${file}`)
        for(const imagefolder of imagefolders){
            const image = await canvas.loadImage(`./uploads/${file}/${imagefolder}`);
            const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
            descriptors.push(detection.descriptor)
        }
        const newLabeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(file, descriptors)
        faceDescriptors.push(newLabeledFaceDescriptors)
        console.log(`${file} data trained!`)
    }
    return faceDescriptors
}

let faceMatcher

const readTrainingData = async(req, res) => { 
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk('./modelsTraining'),
        faceapi.nets.faceLandmark68Net.loadFromDisk('./modelsTraining'),
        faceapi.nets.faceRecognitionNet.loadFromDisk('./modelsTraining')
    ])

    fs.readFile('./faceRecognition/trainingData.json', async (err, data) => {  
        if (err) {
            console.log(err);
        }  
        try {
            console.log('Start reading data...')
            let content = JSON.parse(data);
            for (var x = 0; x < Object.keys(content).length; x++) {
                for (var y = 0; y < Object.keys(content[x].descriptors).length; y++) {
                    var results = Object.values(content[x].descriptors[y]);
                    content[x].descriptors[y] = new Float32Array(results);
                }
            }
            if(!content) console.log('Reading JSON failed!')
            faceMatcher = await createFaceMatcher(content);
            console.log('Reading data done!')
        } catch (error) {
            console.log(error) 
        }        
    });
}
  
async function createFaceMatcher(data) {
    const labeledFaceDescriptors = await Promise.all(data.map(className => {
        const descriptors = [];
        for (var i = 0; i < className.descriptors.length; i++) {
            descriptors.push(className.descriptors[i]);
        }
        return new faceapi.LabeledFaceDescriptors(className.label, descriptors);
    }))
    return new faceapi.FaceMatcher(labeledFaceDescriptors);
}

const trainingStart = async(req, res) => {
    try {
        console.log("Start training data...")

        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromDisk('./modelsTraining'),
            faceapi.nets.faceLandmark68Net.loadFromDisk('./modelsTraining'),
            faceapi.nets.faceRecognitionNet.loadFromDisk('./modelsTraining')
        ])
    
        const trainingData = await loadTrainingData()
        let data = JSON.stringify(trainingData);
        fs.writeFileSync('./faceRecognition/trainingData.json', data);
           
        console.log('Training data done!')
        res.json({
            success: true,
            message: 'Training data done!',
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'Something went wrong!',
        })
    }
    
}

async function image(file) {
    const decoded = tf.node.decodeImage(file);
    // const casted = decoded.toFloat();
    // const result = casted.expandDims(0);
    // decoded.dispose();
    // casted.dispose();
    return decoded;
}

async function detect(tensor) {
    const result = await faceapi.detectSingleFace(tensor).withFaceLandmarks().withFaceDescriptor()
    return result;
}



const faceRecognite = async (req, res) => {
    try {        
        const data = req.body

        var base64Data = data.base64.replace(/^data:image\/jpeg;base64,/, "");

        fs.writeFile(`./storedImage/temp.jpeg`, base64Data, 'base64', function(err) {
            
        });

        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromDisk('./modelsTraining'),
            faceapi.nets.faceLandmark68Net.loadFromDisk('./modelsTraining'),
            faceapi.nets.faceRecognitionNet.loadFromDisk('./modelsTraining')
        ])

        const REFERENCE_IMAGE = "./storedImage/temp.jpeg"
        const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
        const detection = await faceapi.detectSingleFace(referenceImage).withFaceLandmarks().withFaceDescriptor()
        const getid = faceMatcher.findBestMatch(detection.descriptor)

        const condition = {
            studentId: getid._label
        }

        const student = await studentModel.findOne(condition)

        const id = student.studentId

        var date = new Date();
        var currentDate = date
        var currentDay = date.getDay()
        var currentHour = date.getHours()

        const Class = await classModel.findOne({
            students: id,
            dayOfWeek: currentDay,
            startDate: {
                $lt: currentDate
            },
            endDate: {
                $gt: currentDate
            },
            startTime: {
                $lt: currentHour
            },
            endTime: {
                $gt: currentHour
            }
        })

        if(!Class){
            res.status(204).json({
                success: false,
                message: 'Student or Class not found!'
            });
        }
        else {
            res.status(200).json({
                success: true,
                student,
                Class
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

module.exports = { trainingStart, readTrainingData, faceRecognite } 