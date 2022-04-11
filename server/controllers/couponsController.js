const  couponModel = require('../models/coupon') 
const  customerModel = require('../models/customer') 
const  orderModel = require('../models/order') 
const  customerCouponModel = require('../models/customerCoupon') 

const getCoupons = async (req, res) => {
  try {
    var date = new Date();
    const coupons = await couponModel.find({
      usage: 'THIS',
      startDate: {
        $lte: date
      },
      endDate: {
        $gte: date
      }
    });
    const publicCoupons = coupons.filter(e => e.applyTo === 'EVERYONE')
    const accountCoupons = coupons.filter(e => e.applyTo === 'ACCOUNT')

    res.status(200).json({
      success: true,
      public: publicCoupons,
      account: accountCoupons
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getCouponsByCustomerId = async(req, res) => {
  try {
    var date = new Date();
    const couponsById = await customerCouponModel.find({
      customerId: req.body.id,
      startDate: {
        $lte: date
      },
      endDate: {
        $gte: date
      }
    })
    if(!couponsById) {
      res.status(202).json({
        success: false,
        coupons: []
      })
    } 
    else {
      const result = []
      await Promise.all (couponsById.map(async(e) => {
        const detail = await couponModel.findById(e.couponId)
        const obj = {
          coupon: e,
          detail
        }
        result.push(obj)
      }))
      res.status(202).json({
        success: true,
        coupons: result
      })
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
}

const findCoupon = async (req, res) => {
  try {
    const {couponId} = req.body
    var date = new Date();
    const coupon = await couponModel.findOne({
      _id: couponId,
      startDate: {
        $lte: date
      },
      endDate: {
        $gte: date
      }
    })
    if(coupon) {
      res.status(202).json({ 
        success: true,
        coupon: coupon
      });
    }
    else {
      const customerCoupon = await customerCouponModel.findOne({
        _id: couponId,
        expiredDate: {
          $gte: date
        }
      })
      if(customerCoupon) {
        const coupon = await couponModel.findById(customerCoupon.couponId)
        res.status(202).json({ 
          success: true,
          coupon: coupon 
        });
      } else {
        res.status(200).json({ 
          success: false,
          message: 'Invalid coupon'
        });
      }
    }
  }catch (err){
    res.status(500).json({
      success: false, 
      error: err,
      message: 'Internal server error'
    });
  }
}

const createCoupon = async (req, res) => {
  try {
    const data = req.body.newCoupon;

    let newCoupon = new couponModel(data)

    await newCoupon.save();

    res.status(200).json({
      success: true,
      coupon: newCoupon
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err});
  }
};


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


const checkCouponCondition = async(req, res) => {
  try {
      const data = req.body
      const customer = await customerModel.findOne({username: data.customer})
      const find = await customerCouponModel.find({customerId: customer._id, isCreated: true})
      console.log(find)
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

const couponsData = {
  getCoupons, 
  createCoupon, 
  checkCouponCondition, 
  findCoupon, 
  getCouponsByCustomerId
}

module.exports = couponsData