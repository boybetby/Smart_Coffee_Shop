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
        await mongoose.connect(`your string`)
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
app.use('/api/admin', handleRequest, adminRouter)
app.use('/trainingFaceRecognition', trainingStart)
app.use('/trainingProductRecommendation', main)

app.use('/drinks', express.static('drinks'));

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

const schedule = require('node-schedule');

let FR_hour = '00'
let FR_minute = '00'
let FR_time = `${FR_minute} ${FR_hour} * * *`
const time_trainningfacerecognition = schedule.scheduleJob(FR_time, function(){
  console.log('training face regcognition start');
  trainingStart
  console.log('training face regcognition end');
});

let PR_hour = '00'
let PR_minute = '00'
let PR_time = `${PR_minute} ${PR_hour} * * *`
const time_trainingproductrecommendation = schedule.scheduleJob(PR_time, function(){
    console.log('training product recommendation start');
    main
    console.log('training product recommendation end');
});
