const express = require("express")
const { getCustomers, authCustomer, registerCustomer,loginCustomer } = require('../controllers/customersController')
const { faceRecognite } = require('../faceRecognition/trainingData')
const {verifyToken, verify} = require('../middlewares/auth')

const router = express.Router();

router.get('/', getCustomers);

router.get('/auth', verify, authCustomer)

router.post('/register', registerCustomer);

router.post('/login', loginCustomer)

//nhan dien khuon mat
router.post('/detect' , verifyToken, faceRecognite)

module.exports = router
