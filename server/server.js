require('dotenv').config()

const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 5000

const customerRouter = require('./routers/customerRouter')
const drinkRouter = require('./routers/drinkRouter')
const orderRouter = require('./routers/orderRouter')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const couponRouter = require('./routers/couponRouter')

const { trainingStart, readTrainingData } = require('./faceRecognition/trainingData')
const { main } = require('./productRecommendation/ML')
const customerCoupon = require('./models/customerCoupon')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@merndemo.gjvma.mongodb.net/MERNdemo?retryWrites=true&w=majority`)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB().then(() => {
    // let data = readTrainingData()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors())

const handleRequest = (req, res, next) => {
    console.log('received an api request')
    next()
}

//@user
app.use('/api/customer', handleRequest, customerRouter)
app.use('/api/drink', handleRequest, drinkRouter)
app.use('/api/order', handleRequest, orderRouter)
app.use('/api/user', handleRequest, userRouter)
app.use('/api/coupon', handleRequest, couponRouter)

//@admin
// var server = app.listen();
// server.setTimeout(9000000000000);

app.use('/api/admin', handleRequest, adminRouter)
app.use('/trainingFaceRecognition', trainingStart)
app.use('/trainingProductRecommendation', main)

app.use('/drinks', express.static('drinks'));

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
