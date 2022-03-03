const mongoose = require('mongoose');

const Schema =  mongoose.Schema

const ClassSchema = new Schema({
    className: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    lecturerId: {
        type: String
    }, 
    students: [{
        type : String
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('classes', ClassSchema)