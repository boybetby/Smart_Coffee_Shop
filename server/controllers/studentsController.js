const  studentModel = require('../models/student') 

const getStudents = async (req, res) => {
  try {
    const students = await studentModel.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const findStudent = async (req, res) => {
  try {
    const {studentId} = req.body

    const student = await studentModel.findOne({studentId})
    if(!student){
      res.status(404).json({ 
        success: false,
        message : 'Can not find student' 
      });
    }
    else{
      res.status(200).json({ 
        success: true,
        student 
      });
    }
  }catch (err){
    res.status(500).json({ 
      error: err,
      message: 'Internal server error'
    });
  }
}

const createStudent = async (req, res) => {
  try {
    // const newStudent = req.body;
    let newStudent = new studentModel({
      fullName: req.body.fullName,
      enrollmentNo: req.body.enrollmentNo,
      studentId: req.body.studentId,
      className: req.body.className
    })
    
    if(req.files){
      let path = ""
      req.files.forEach(function(files, index, arr){
        path = path + files.path + ","
      })
      path = path.substring(0, path.lastIndexOf(","))
      newStudent.studentImages = path
    }

    const student = new studentModel(newStudent);

    await student.save();

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const updateStudent = async (req, res) => {
  try {
    const updateStudent = req.body;

    const student = await studentModel.findOneAndUpdate(
      { _id: updateStudent._id },
      student,
      { new: true }
    );
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ 
      error: err ,
    });
  }
};

const deleteStudent = async(req, res) => {
  try {
      const studentUpdateCondition = {
          _id : req.params.id,
          student: req.studentId
      }

      const deleteStudent = await studentModel.findOneAndDelete(studentUpdateCondition)
      
      if(!deleteStudent){
          return res.status(401).json({
              success: false,
              message: 'Student not found'
          })
      }

      res.json({
          success: true,
          message: 'deleted successfully',
          student: deleteStudent
      })

  } catch (error) {
      console.log(error)
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      })
  }
}


module.exports = {getStudents, createStudent, updateStudent, deleteStudent, findStudent}