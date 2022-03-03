const classModel = require('../models/class') 
const studentModel = require('../models/student')
const attendanceModel = require('../models/attendance')

const getAttendance =  async (req, res) => {
    try {
        const attendances = await attendanceModel.find();
        res.status(200).json(attendances);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const getAttendandbyClassId = async (req, res) => {
    try {
        const { classId } = req.body
        const attendances = await attendanceModel.find({classId})
        if(attendances.length===0){
            res.status(400).json({
                success: false,
                message: 'Can not find class attendance'
            })
        }
        else{
            res.status(200).json({
                success: true,
                attendances
            })
        }
    } catch (error) {
        res.status(500).json({ 
            error: error,
            message: 'Internal server error'
        });
    }
}

const getStudentAttendance = async (req, res) => {
    try {
        let studentId = req.body.studentId
        let classId = req.body.classId

        const Attendance = await classModel.findOne({
            Student: {
                $elemMatch: {
                    studentId: studentId
                }
            },
            Class: {
                $elemMatch: {
                    _id: classId
                }
            }
        })

        if(!Attendance){
            res.status(404).json({
                success: false,
                message: `Could not get student's attendance.`
            })
        }
        else{
            res.status(200).json({
                success: true,
                attendance: Attendance
            })
        }

    } catch (error) {
        res.status(500).json({ 
            error: err,
            message: 'Internal server error'
        });
    }
}

const createAttendance = async(req, res) => {
    try {
        let newAttendance = new attendanceModel({
            studentId: req.body.studentId,
            classId: req.body.classId
        })
        const Attendance = new attendanceModel(newAttendance);
        await Attendance.save();

        res.status(200).json({
            success: true,
            attendance: Attendance
        })
    } catch (error) {
        
    }
    
}

const pushAttendance = async (req, res) => {
    try {
        let studentId = req.body.studentId
        let classId = req.body.classId
        let attended = new Date();

        const Attendance = await attendanceModel.findOneAndUpdate(
            {
                studentId: studentId,
                classId: classId
            },
            {
                $push: {
                    attended: attended
                }
            },
            {
                new: true
            }
        )
        if(!Attendance){
            res.status(404).json({
                success: false,
                Attendance: 'Creating or Updating attendance failed!'
            });
        }
        else {
            res.status(200).json({
                success: true,
                Attendance: Attendance
            });
        }
    } catch (error) {
        res.status(500).json({ 
            error: error,
            message: 'Internal server error'
        });
    }
}

module.exports = { getAttendance, createAttendance, pushAttendance, getAttendandbyClassId }