require('dotenv').config()

const  teacherModel = require('../models/teacher') 
const classModel = require('../models/class')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const authTeacher = async (req, res) => {
  try {
		const teacher = await teacherModel.findById(req.teacherId).select('-password')
		if (!teacher)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, teacher })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

const loginTeacher = async (req, res) => {
  const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const teacher = await teacherModel.findOne({ username })
		if (!teacher)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2.verify(teacher.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ teacherId: teacher._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

const registerTeacher = async (req, res) => {
  const { username, password, teacherName } = req.body
  if (!username || !password)
		return res.status(400).json({ 
      success: false, 
      message: 'Missing username and/or password' 
    })
    try {
      //Check for existing teacher
      const teacher = await teacherModel.findOne({ username })
  
      if (teacher)
        return res
          .status(400)
          .json({ success: false, message: 'username already taken' })
  
      // All good
      const hashedPassword = await argon2.hash(password)
      const newteacher = new teacherModel({ 
        username: username, 
        password: hashedPassword,
        teacherName: teacherName
      })
      await newteacher.save()
  
      // Return token
      const accessToken = jwt.sign(
        { teacherId: newteacher._id },
        process.env.ACCESS_TOKEN_SECRET
      )
  
      res.json({
        success: true,
        message: 'teacher created successfully',
        accessToken
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const getTeacherClasses = async (req, res) => {
  try {
    const { teacherId } = req.body

    const teacher = await teacherModel.findOne({teacherId})
    
    if(!teacher) {
      res.status(400).json({
        success: false,
        message: 'Can not find teacher'
      })
    }
    const classesid = teacher.teachingClasses
    const classes = await classModel.find({
      _id : {
        $in : classesid
      }
    });
    res.status(200).json({
      success: true,
      classes
    })
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

module.exports = { getTeachers, authTeacher, registerTeacher, loginTeacher, getTeacherClasses }