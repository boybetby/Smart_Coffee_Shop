const mongoose = require('mongoose');
const Student = require('../models/student') 
const Class = require('../models/class')

const Schema =  mongoose.Schema

const AttendanceSchema = new Schema({
   studentId: {
       type: String,
       required: true
   },
   studentName: {
        type: String
   },
   classId: {
       type: String,
       required: true
   },
   attended: [{
       type: Date
   }]
})

module.exports = mongoose.model('attendance', AttendanceSchema)