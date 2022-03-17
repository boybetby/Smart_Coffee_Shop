const express = require("express")
const { loginUser, registerUser } = require('../controllers/userController')
const {verifyToken, verify} = require('../middlewares/auth')

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser)

module.exports = router
