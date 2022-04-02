const express = require("express")
const { getCoupons, createCoupon, checkCouponCondition, findCoupon, getCouponsByCustomerId } = require('../controllers/couponsController')

const router = express.Router();

router.get('/', getCoupons)

router.post('/createCoupon', createCoupon);

router.post('/findByCustomerId', getCouponsByCustomerId);

router.post('/findCoupon', findCoupon);

router.post('/checkCouponCondition', checkCouponCondition);

module.exports = router
