const express = require("express")

const { getStudents, createStudent, updateStudent, deleteStudent, findStudent } = require('../controllers/studentsController')
const { faceRecognite } = require('../faceRecognition/trainingData')

const {verifyToken} = require('../middlewares/auth')

const { upload } = require('../middlewares/multer')

const router = express.Router();

router.get('/', getStudents);

router.post('/findstudent', findStudent);

router.post('/',upload.array('studentImages'), createStudent);

router.post('/', updateStudent);

router.delete('/:id', deleteStudent)


//nhan dien khuon mat
router.post('/detect' , verifyToken, faceRecognite)
// router.post('/detect', faceRecognite)


module.exports = router
