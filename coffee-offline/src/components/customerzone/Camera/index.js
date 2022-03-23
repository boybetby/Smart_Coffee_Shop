import React, { useContext, useLayoutEffect } from 'react'
import Webcam from "react-webcam";
import { Button } from 'react-bootstrap'
import { FaceContext } from '../../../contexts/FaceContext'
import './style.css'
import * as faceapi from 'face-api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Camera = () => {
    const {
        faceState: { faceData },
        getCustomerInfo,
        clearCustomerState
    } = useContext(FaceContext)

    let faceMatcher

    const webcamRef = React.useRef(null);
    
    async function init() {
        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ])
        const content = faceData
        for (var x = 0; x < Object.keys(content).length; x++) {
            for (var y = 0; y < Object.keys(content[x].descriptors).length; y++) {
                var results = Object.values(content[x].descriptors[y]);
                content[x].descriptors[y] = new Float32Array(results);
            }
        }
        faceMatcher = await createFaceMatcher(content)
    }

    init()

    async function createFaceMatcher(data) {
        const labeledFaceDescriptors = await Promise.all(data.map(className => {
            const descriptors = [];
            for (var i = 0; i < className.descriptors.length; i++) {
                descriptors.push(className.descriptors[i]);
            }
            return new faceapi.LabeledFaceDescriptors(className.label, descriptors);
        }))
        return new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4);
    }
    
    const handleFileChange = async (e) => {
        const detection = await faceapi.detectSingleFace(e).withFaceLandmarks().withFaceDescriptor()
        const face = faceMatcher.findBestMatch(detection.descriptor)
        return face
    }
    
    const handleClick = async() => {
        clearCustomerState()
        const imageSrc = webcamRef.current.getScreenshot();
        var image = new Image();
        image.src = imageSrc
        const face = await handleFileChange(image)
        await getCustomerInfo(face._label)
    }

    return (
        <div className='camera'>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
            <input type="file" id="file-input" style={{display: "none"}} onChange={(e) => handleFileChange(e)}></input>
            <Webcam className={'webcam'}
                audio={false}
                width={130}
                height={130}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                forceScreenshotSourceSize="true"
            />
            <Button variant="primary" className='btn_camera' onClick={handleClick}>DETECT</Button>
        </div>
    )
}

export default Camera