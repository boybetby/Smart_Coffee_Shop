const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const CustomerCouponSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    couponId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    expiredDate: {
        type: Date
    },
    expired: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('customercoupons', CustomerCouponSchema)