const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const OrderSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: String,
        default: 'guest'
    },
    customerName: {
        type: String,
        default: 'guest'
    },
    drinks: [{
        _id: {
            type: String
        },
        drinkName: {
            type: String
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        },
        singlePrice: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    totalPrice: {
        type: Number
    },
    finalPrice: {
        type: Number,
        default: this.totalPrice
    },
    type: {
        type: String,
        enum: ['OFFLINE', 'DELIVERY', 'TAKE AWAY']
    },
    pickupTime: {
        type: Date
    },
    customerAddress: {
        type: String,
        default: 'at Coffee Shop'
    },
    coupon: {
        type: String,
        default: "None"
    }
})

module.exports = mongoose.model('orders', OrderSchema)