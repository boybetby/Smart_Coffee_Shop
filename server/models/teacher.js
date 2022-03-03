const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const TeacherSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    teachingClasses: [{
        type: String,
        unique: true
    }]
})

module.exports = mongoose.model('teachers', TeacherSchema)