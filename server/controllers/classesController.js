const classModel = require('../models/class') 
const attendanceModel = require('../models/attendance')
const teacherModel = require('../models/teacher')
const studentModel = require('../models/student');
const { copyFileSync } = require('fs');

const getClasses = async (req, res) => {
  try {
    const classes = await classModel.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const findClass = async (req, res) => {
  try {
    const {_id} = req.body

    const Class = await classModel.findOne({_id})
    if(!Class){
      res.status(404).json({ 
        success: false,
        message : 'Can not find student' 
      });
    }
    else{
      res.status(200).json({ 
        success: true,
        Class 
      });
    }
  }catch (err){
    res.status(500).json({ 
      error: err,
      message: 'Internal server error'
    });
  }
}


const createClass = async (req, res) => {
  try {
    let newClass = new classModel({
      className: req.body.className,
      subjectId: req.body.subjectId,
      lecturerId: req.body.lecturerId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      dayOfWeek: req.body.dayOfWeek,
      students: req.body.students
    })
    

    const Class = new classModel(newClass);
    await Class.save();

    for (const student of Class.students) {
      let std = await studentModel.findOne({studentId: student})
      let studentsAttendance = new attendanceModel({
        studentId: std.studentId,
        studentName: std.fullName,
        classId: Class._id
      })
      await studentsAttendance.save();
    }

    const teacher = await teacherModel.findOneAndUpdate(
      {
          teacherId: Class.teacherId,
      },
      {
          $push: {
              teachingClasses: Class._id
          }
      },
      {
          new: true
      }
    )
    await teacher.save()

    res.status(200).json({
        success: true,    
        Class
    });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};


//find class by studentid and date time
const findClassWithId = async (req, res) => {
    try {
        const studentId = req.body.studentId
        
        //get current Date
        var date = new Date();
        var currentDate = date
        var currentDay = date.getDay();
        var currentHour = date.getHours()

        const Class = await classModel.findOne({
            students: studentId,
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
            res.status(404).json({
                success: false,
                message: 'Student or Class not found!'
            });
        }
        else {
            res.status(200).json({
                success: true,
                Class
            });
        }
    }catch (err) {
        res.status(500).json({ error: err});
    }
}

const updateClass = async (req, res) => {
//   try {
//     const updateStudent = req.body;

//     const student = await studentModel.findOneAndUpdate(
//       { _id: updateStudent._id },
//       student,
//       { new: true }
//     );
//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).json({ 
//       error: err ,
//     });
//   }
};

const deleteClass = async(req, res) => {
  try {
    //   const studentUpdateCondition = {
    //       _id : req.params.id,
    //       student: req.studentId
    //   }

    //   const deleteStudent = await studentModel.findOneAndDelete(studentUpdateCondition)
      
    //   if(!deleteStudent){
    //       return res.status(401).json({
    //           success: false,
    //           message: 'Student not found'
    //       })
    //   }

    //   res.json({
    //       success: true,
    //       message: 'deleted successfully',
    //       student: deleteStudent
    //   })

  } catch (error) {
      console.log(error)
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      })
  }
}


module.exports = { getClasses, findClass, findClassWithId, createClass }