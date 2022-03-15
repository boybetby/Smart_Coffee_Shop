require('dotenv').config()

const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');

const PORT = 5000

// const studentRouter = require('./routers/studentRouter')
// const classRouter = require('./routers/classRouter')
// const attendanceRouter = require('./routers/attendanceRouter')
// const teacherRouter = require('./routers/teacherRouter')
const customerRouter = require('./routers/customerRouter')
const drinkRouter = require('./routers/drinkRouter')
const orderRouter = require('./routers/orderRouter')

const { trainingStart, readTrainingData } = require('./faceRecognition/trainingData')
const { main } = require('./productRecommendation/ML')

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
    let data = readTrainingData()
})

app.use(express.json());
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true}));
app.use(cors())

// app.use('/api/student', studentRouter)
// app.use('/api/class', classRouter)
// app.use('/api/attendance', attendanceRouter)
// app.use('/api/teacher', teacherRouter)
app.use('/api/customer', customerRouter)
app.use('/api/drink', drinkRouter)
app.use('/api/order', orderRouter)
app.use('/api/customer', customerRouter)

app.use('/trainingdata', trainingStart)
app.use('/tranningmachinelearning', main)

app.use('/drinks', express.static('drinks'));

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
