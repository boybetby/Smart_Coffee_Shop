const express = require("express")

const { getAttendance, createAttendance, pushAttendance, getAttendandbyClassId } = require('../controllers/attendanceController')
const {verify} = require('../middlewares/auth')

const router = express.Router();

router.get("/", getAttendance)
router.post('/getClassAttendance', verify, getAttendandbyClassId)
router.post('/createAttendance', createAttendance)
router.post('/pushAttendance', pushAttendance);

module.exports = router
