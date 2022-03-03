require('dotenv').config()

const  customerModel = require('../models/customer') 
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');

const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const authCustomer = async (req, res) => {
  try {
		const customer = await customerModel.findById(req.customerId).select('-password')
		if (!customer)
			return res.status(400).json({ success: false, message: 'Customer not found' })
		res.json({ success: true, customer })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

const loginCustomer = async (req, res) => {
  const { username, password } = req.body
	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing customer
		const customer = await customerModel.findOne({ username })
		if (!customer)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })
		// Username found
		const passwordValid = await argon2.verify(customer.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ customerId: customer._id },
			process.env.ACCESS_TOKEN_SECRET
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

const registerCustomer = async (req, res) => {
  const { username, password, customerName } = req.body.registerInfo
  if (!username || !password)
		return res.status(200).json({ 
      success: false, 
      message: 'Missing username and/or password' 
    })
    try {
      //Check for existing customer
      const customer = await customerModel.findOne({ username })
  
      if (customer && customer.isCreated){
        return res
          .status(200)
          .json({ success: false, message: 'Phonenumber already in used' })
      }

      const hashedPassword = await argon2.hash(password)
      if(customer && !customer.isCreated){
        const updatePassword = await customerModel.findOneAndUpdate(
          {
            username: username
          },
          {
            password: hashedPassword,
            customerName: customerName,
            passwordChanged: true,
            isCreated: true
          }
        )
        const accessToken = jwt.sign(
          { customerId: updatePassword._id },
          process.env.ACCESS_TOKEN_SECRET
        )
        res.status(202).json({
          success: true,
          message: 'customer created successfully',
          accessToken
        })
      }

      // All good
      const newcustomer = new customerModel({ 
        username: username,
        password: hashedPassword,
        customerName: customerName,
        passwordChanged: true,
        isCreated: true
      })
      await newcustomer.save()
  
      // Return token
      const accessToken = jwt.sign(
        { customerId: newcustomer._id },
        process.env.ACCESS_TOKEN_SECRET
      )
  
      res.json({
        success: true,
        message: 'customer created successfully',
        accessToken
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
}



module.exports = { getCustomers, authCustomer, registerCustomer, loginCustomer }