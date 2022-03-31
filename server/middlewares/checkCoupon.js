const  couponModel = require('../models/coupon') 
const  customerModel = require('../models/customer') 
const  orderModel = require('../models/order') 
const  customerCouponModel = require('../models/customerCoupon') 

const checkCouponCondtion = async(req, res, next) => {
    try {
        const data = req.body
        const customer = await customerModel.findOne({username: data.username})
        const coupons = []
        if(!customer.isCreated) next()
        const find = await customerCouponModel.find({customerId: customer._id})
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
            req.newCoupons = coupons
            next()
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
            req.newCoupons = coupons
            next()
          }
        } catch (error) {
          console.log(error)
        }
    } catch (error) {
        console.log(error)
        next()
    }
  }
  

module.exports = { checkCouponCondtion }