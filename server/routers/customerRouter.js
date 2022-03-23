const express = require("express")
const { getCustomers, findCustomer, getOrder, getAllOrders, authCustomer, registerCustomer,loginCustomer, updateCustomer } = require('../controllers/customersController')
const { faceRecognite, getData } = require('../faceRecognition/trainingData')
const {verifyToken, verify} = require('../middlewares/auth')
const { getProductRecommendation } = require('../productRecommendation/ML')

const router = express.Router();

router.get('/', getCustomers);

router.get('/findcustomer/:id', findCustomer);

router.get('/auth', verify, authCustomer)

router.post('/register', registerCustomer);

router.post('/login', loginCustomer)

router.post('/update', updateCustomer)

router.post('/getorder', getOrder)

router.get('/getallorders', getAllOrders)

router.post('/getProductRecommentdation', getProductRecommendation)

//nhan dien khuon mat
router.post('/detect' , verifyToken, faceRecognite)

router.get('/getFaceData' , verifyToken, getData)

module.exports = router
