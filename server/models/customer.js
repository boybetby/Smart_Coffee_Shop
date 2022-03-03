const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const CustomerSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    customerName: {
        type: String,
        default: 'unknown'
    },
    customerImages: [{
        type: String
    }],
    username: {
        type: String,
        unique: true
    }, 
    password: {
        type: String,
        default: ""
    },
    orders: [{
        type : String
    }],
    coupons: [{
        type: String
    }],
    isCreated: {
        type: Boolean,
        default: false
    },
    passwordChanged: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('customers', CustomerSchema)