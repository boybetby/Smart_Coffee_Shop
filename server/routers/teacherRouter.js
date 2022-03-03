const express = require("express")

const { getTeachers, authTeacher, registerTeacher,loginTeacher, getTeacherClasses } = require('../controllers/teachersController')
const {verify} = require('../middlewares/auth')

const router = express.Router();

router.get('/', getTeachers);

router.get('/auth', verify, authTeacher)

router.get('/teacherClasses', getTeacherClasses)

router.post('/register', registerTeacher);

router.post('/login', loginTeacher)


module.exports = router
