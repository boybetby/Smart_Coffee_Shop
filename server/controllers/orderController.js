const orderModel = require('../models/order') 
const customerModel = require('../models/customer')
const argon2 = require('argon2')

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


const findOrder = async (req, res) => {
  try {const {orderId} = req.body

    const order = await orderModel.findOne({orderId})
    if(!order){
      res.status(404).json({ 
        success: false,
        message : 'Can not find order' 
      });
    }
    else{
      res.status(200).json({ 
        success: true,
        order 
      });
    }
  }catch (err){
    res.status(500).json({ 
      error: err,
      message: 'Internal server error'
    });
  }
}

const createOrderOnline = async (req, res) => {
  try {
    // const newOrder = req.body;
    if(!req.body.drinks){
      res.status(400).json({
        success: false,
        message: "No product ordered"
      })
    }
    const findCustomer = await customerModel.findOne({username: req.body.phoneNumber})
    
    let newOrder = new orderModel(req.body)

    if(!findCustomer){
      const newCustomer = new customerModel({username: req.body.username})
      await newCustomer.save();
    }

    await newOrder.save();

    const updateCustomerOrders = await customerModel.findOneAndUpdate(
      {
          username: req.body.username
      },
      {
          $push: {
            orders: newOrder._id
          }
      },
      {
          new: true
      }
    )

    res.status(200).json({
      success: true,
      order: newOrder,
      newCoupons:  req.newCoupons
    });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const createOrderOffline = async (req, res) => {
  try {
    // const newOrder = req.body;
    if(!req.body.order){
      res.status(400).json({
        success: false,
        message: "No product ordered"
      })
    }
    const findCustomer = await customerModel.findById(req.body.id)
    
    let newOrder = new orderModel({
      customer: findCustomer.username,
      customerName: findCustomer.customerName,
      drinks: req.body.order,
      totalPrice: req.body.totalPrice,
      type: 'OFFLINE',
    })

    const order = new orderModel(newOrder);
    await order.save();

    const updateCustomerOrders = await customerModel.findOneAndUpdate(
      {
          username: findCustomer.username
      },
      {
          $push: {
            orders: order._id
          }
      },
      {
          new: true
      }
    )

    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateOrder = req.body;

    const order = await orderModel.findOneAndUpdate(
      { _id: updateOrder._id },
      order,
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ 
      error: err ,
    });
  }
};



const deleteOrder = async(req, res) => {
  try {
      const orderUpdateCondition = {
          _id : req.params.id,
          order: req.orderId
      }

      const deleteOrder = await orderModel.findOneAndDelete(orderUpdateCondition)
      
      if(!deleteOrder){
          return res.status(401).json({
              success: false,
              message: 'Order not found'
          })
      }

      res.json({
          success: true,
          message: 'deleted successfully',
          order: deleteOrder
      })

  } catch (error) {
      console.log(error)
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      })
  }
}


module.exports = { getOrders, createOrderOnline, createOrderOffline, updateOrder, deleteOrder, findOrder}