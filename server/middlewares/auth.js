require('dotenv').config()
const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.customerId = decoded.customerId
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
	}
}

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: 'Access token not found'
        })
    }
    if(authHeader === process.env.ACCESS_TOKEN_HOST){
        next()
    }
    else {
        return res.status(403).json({
            success: false,
            message: 'Invalid token'
        })
    }
}

module.exports = { verifyToken, verify }