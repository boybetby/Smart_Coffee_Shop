const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const UserSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: 'unknown'
    },
    username: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'STAFF'],
        required: true
    }
})

module.exports = mongoose.model('users', UserSchema)