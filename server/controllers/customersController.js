require('dotenv').config()

const  customerModel = require('../models/customer') 
const orderModel = require('../models/order')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const fs = require('fs');
const path = require('path');

//send sms
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const renderFileAddress = (id,name) => {
  return `../uploads/${id}/${name}.jpeg`
}

const createNewCustomer = async(req, res) => {
  try {
    const newCustomer = new customerModel()
    newCustomer.customerImages = `/uploads/${newCustomer._id}/`

    fs.mkdirSync(`./uploads/${newCustomer._id}/`);
    const today = moment(new Date()).format("DDMMYYYYHHmm");
    const base64 = req.body.base64.replace(/^data:image\/jpeg;base64,/, "");
    try{
      fs.writeFileSync( path.join(__dirname, renderFileAddress(newCustomer._id, today)), base64, 'base64', function(err) {
        if(err) console.log(err)
      });
    }catch(error) {
      console.log(error)
    }

    await newCustomer.save()
 
    res.status(202).json({
      success: true,
      newCustomer
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const findCustomer = async(req, res) => {
  try {
    const id = req.params.id
    const customer = await customerModel.findById(id);
    if(!customer) {
      res.status(200).json({
        success: false,
        message: 'Customer not found!'
      })
    }
    else {
      res.status(202).json({
        success: true,
        customer
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const getOrder = async(req, res) => {
  try {
    const orders = await orderModel.find({
      '_id': {
        $in: req.body.orderlist
      }
    }).select('drinks -_id')
    let customerOrder = []
    orders.forEach(drinks => {
      drinks.drinks.forEach(drink => {
        const find = customerOrder.find(a => a._id === drink.id)
        if(find) {
              find.quantity += drink.quantity
        }
        else {
          customerOrder.push(drink)
        }
      })
    })
    res.status(202).json({
      success: true,
      customerOrder
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const getAllOrders = async(req, res) => {
  try {
      let customersOrders = []
      const customers = await customerModel.find()
      for(const customer of customers) {
        const orders = await orderModel.find({
          '_id': {
            $in: customer.orders
          }
        })
        let customerOrder = {
          customer: '',
          orders: []
        }
        orders.forEach(drinks => {
          drinks.drinks.forEach(drink => {
            const find = customerOrder.orders.find(a => a._id === drink.id)
            if(find) {
                  find.quantity += drink.quantity
            }
            else {
              customerOrder.orders.push(drink)
            }
          })
        })
        customerOrder.customer = customer.username
        customersOrders.push(customerOrder)
      }
      res.status(202).json({
        success: true,
        customersOrders
      })
    } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

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
    else {
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
    }
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

const registerCustomer = async (req, res) => {
  if(!req.body.registerInfo){
    return res.status(404).json({ 
      success: false, 
      message: 'Wrong format' 
    })
  }
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
      if(customer && customer.isCreated && !customer.passwordChanged) {
        return res
          .status(200)
          .json({ success: false, message: 'Account is created, please use password we sent to use to login' })
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

const updateCustomer = async (req, res) => {
    const newPassword = await argon2.hash('123456')
    try {
      const updateCustomer = {
        _id: req.body.id,
        customerName: req.body.name,
        username: req.body.phonenumber,
        password: newPassword
      };

      const findCustomer = await customerModel.findOne({
        username: updateCustomer.username
      })

      if(findCustomer) {
        const customer = await customerModel.findOneAndUpdate(
          { _id: updateCustomer._id },
          {
            customerName: updateCustomer.customerName,
            username: updateCustomer.username,
            password: findCustomer.password,
            orders: findCustomer.orders,
            coupons: findCustomer.coupons,
            isCreated: true,
            passwordChanged: false
          },
          { new: true }
        );
        if(customer) await customerModel.findOneAndDelete({'_id': findCustomer._id})
        res.status(202).json({
          success: true,
          message: 'Customer updated',
          customer
        })
      }
      else {
        const customer = await customerModel.findOneAndUpdate(
          { _id: updateCustomer._id },
          {
            customerName: updateCustomer.customerName,
            username: updateCustomer.username,
            password: updateCustomer.password,
            isCreated: true
          },
          { new: true }
        );
        // try {
        //   client.messages.create({
        //     body: "Your Smart Coffee account's password is 123456. Please do not share this password",
        //     from: '+14405956709',
        //     to: `+84${customer.username.substring(1)}`
        //   }).then(message => console.log(message.sid));
        // } catch (error) {
        //   console.log(error)
        // }
        res.status(202).json({
          success: true,
          message: 'Customer updated',
          customer
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { getCustomers, 
  findCustomer, 
  getOrder, 
  getAllOrders, 
  authCustomer, 
  registerCustomer, 
  loginCustomer, 
  updateCustomer,
  createNewCustomer 
}