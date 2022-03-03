const express = require("express")

const { getCustomers, authCustomer, registerCustomer,loginCustomer } = require('../controllers/customersController')
const {verify} = require('../middlewares/auth')

const router = express.Router();

router.get('/', getCustomers);

router.get('/auth', verify, authCustomer)

router.post('/register', registerCustomer);

router.post('/login', loginCustomer)


module.exports = router
