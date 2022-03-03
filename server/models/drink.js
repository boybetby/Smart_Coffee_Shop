const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const DrinkSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    drinkName: {
        type: String,
        required: true,
        unique: true
    },
    drinkImage: {
        type: String
    },
    defaultPrice: [{
        type: Number,
        required: true
    }],
    category: {
        type: String,
        enum: ["COFFEE","TEA","FREEZE"]
    },
    sale: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    ingredients: [{
        type: String
    }]
})

module.exports = mongoose.model('drinks', DrinkSchema)