const express = require("express")
const { loginUser, registerUser, loadUser } = require('../controllers/userController')
const { verifyUser } = require('../middlewares/auth')

const router = express.Router();

router.get('/', verifyUser, loadUser)

router.post('/register', registerUser);

router.post('/login', loginUser)

module.exports = router
