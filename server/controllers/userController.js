require('dotenv').config()

const argon2 = require('argon2')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { username, password } = req.body
      // Simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })
  
    try {
        // Check for existing user
        const user = await userModel.findOne({ username })
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' })
        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' })

        // All good
        // Return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_USER
        )

        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
  
const registerUser = async (req, res) => {
    const { username, password, name, role } = req.body

    if (!username || !password) {
        return res.status(200).json({ 
            success: false, 
            message: 'Missing username and/or password' 
        })
    }
    try {
        //Check for existing user
        const user = await userModel.findOne({ username })

        if (user){
            return res
            .status(200)
            .json({ success: false, message: 'Username already in used' })
        }

        const hashedPassword = await argon2.hash(password)
        
        // All good
        const newUser = new userModel({ 
            username: username,
            password: hashedPassword,
            name: name,
            role: role
        })
        await newUser.save()
        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_USER
        )
        

        res.json({
            success: true,
            message: 'user created successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { loginUser, registerUser }