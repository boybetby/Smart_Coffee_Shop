const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const StudentSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    fullName: {
        type: String,
        required: true
    },
    studentImages: {
        type: String,
        required: true
    },
    enrollmentNo: {
        type: String,
        required: true
    }, 
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    className: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('students', StudentSchema)