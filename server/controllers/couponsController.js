const  couponModel = require('../models/coupon') 
const  customerModel = require('../models/customer') 
const  orderModel = require('../models/order') 
const  customerCouponModel = require('../models/customerCoupon') 

const getCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find();
    res.status(200).json({
      success: true,
      coupons
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


const findCoupon = async (req, res) => {
  try {
    const {couponId} = req.body

    const coupon = await couponModel.findOne({couponId})
    if(!coupon){
      res.status(404).json({ 
        success: false,
        message : 'Can not find coupon' 
      });
    }
    else{
      res.status(200).json({ 
        success: true,
        coupon 
      });
    }
  }catch (err){
    res.status(500).json({ 
      error: err,
      message: 'Internal server error'
    });
  }
}

const createCoupon = async (req, res) => {
  try {
    const data = req.body;
    let newCoupon = new couponModel(data)

    await newCoupon.save();

    res.status(200).json({
      success: true,
      coupon: newCoupon
    });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const checkOrderCoupon = async(req, res) => {
  
}

const updateCoupon = async (req, res) => {
  try {
    const updateCoupon = req.body;

    const coupon = await couponModel.findOneAndUpdate(
      { _id: updateCoupon._id },
      coupon,
      { new: true }
    );
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ 
      error: err ,
    });
  }
};


const test = async(req, res) => {
  try {
      const data = req.body
      const customer = await customerModel.findOne({username: data.username})
      const find = await customerCouponModel.find({customerId: customer._id})
      const coupons = []
      var date = new Date();
      try {   
        const check = await couponModel.find({
          applyTo: "ACCOUNT",
          usage: "NEXT",
          startDate: {
              $lte: date
          },
          endDate: {
              $gte: date
          }
        })
        if(check.length===0) {
          res.status(202).json({
            success: true,
            message: 'No coupon available right now',
            coupons
          })
        }
        else {
          await Promise.all(
            check.map(async(coupon) => {
              if(!find.find(e => e.couponId === coupon._id.toString())) { 
                switch(coupon.conditionType) {
                    case 'ALL_ORDERS':
                      const query = await orderModel.find({
                          username: data.username,
                          createAt: {
                            $gte: coupon.startDate,
                            $lte: coupon.endDate
                          }
                      })
                      let total = 0
                      query.map(e => {
                          total += e.totalPrice
                      })
                      //check if condition met
                      if(coupon.condtionValue === total) {
                          const getCoupon = new customerCouponModel({
                              couponId: coupon._id,
                              customerId: customer._id,
                              expiredDate: coupon.endDate
                          })
                          await getCoupon.save()
                          coupons.push(getCoupon)
                      }
                      break;
                    case 'ONE_ORDER':
                      if(data.totalPrice >= coupon.conditionValue) {
                          const getCoupon = new customerCouponModel({
                              couponId: coupon._id,
                              customerId: customer._id,
                              expiredDate: coupon.endDate
                          })
                          await getCoupon.save()
                          coupons.push(getCoupon)
                      }
                      break;
                }
              }
            })
          )
          res.status(202).json({
              success: true,
              coupons
          })
        }
      } catch (error) {
        console.log(error)
      }
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: 'Internal server error'
      })
  }
}

const deleteCoupon = async(req, res) => {
  try {
      const couponUpdateCondition = {
          _id : req.params.id,
          coupon: req.couponId
      }

      const deleteCoupon = await couponModel.findOneAndDelete(couponUpdateCondition)
      
      if(!deleteCoupon){
          return res.status(401).json({
              success: false,
              message: 'Coupon not found'
          })
      }

      res.json({
          success: true,
          message: 'deleted successfully',
          coupon: deleteCoupon
      })

  } catch (error) {
      console.log(error)
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      })
  }
}


module.exports = { getCoupons, createCoupon, test }