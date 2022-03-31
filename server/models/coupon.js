const mongoose = require('mongoose');
const Schema =  mongoose.Schema

//template
//EVERYONE - THIS - ONE_ORDER
//ACCOUNT - THIS/NEXT - ONE_ORDER/ALL_ORDERS


const CouponSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    couponName: {
        type: String
    },
    description: {
        type: String
    },
    applyTo :{
        type: String,
        enum: ['EVERYONE', 'ACCOUNT'],
        required: true
    },
    usage: {
        type: String,
        enum: ['THIS', 'NEXT'],
        required: true
    },
    conditionType: {
        type: String,
        enum: ['ALL_ORDERS', 'ONE_ORDER'],
        required: true
    },
    conditionValue: {
        type: Number,
        required: true
    },
    discountUnit: {
        type: String,
        enum: ['PERCENTAGE', 'AMOUNT'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('coupons', CouponSchema)