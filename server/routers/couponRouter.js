const express = require("express")
const { getCoupons, createCoupon, test } = require('../controllers/couponsController')

const router = express.Router();

router.get('/', getCoupons)

router.post('/createCoupon', createCoupon);

router.post('/test', test);

module.exports = router
