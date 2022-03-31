const express = require("express")

const { getOrders, createOrderOnline, createOrderOffline, updateOrder, deleteOrder, findOrder } = require('../controllers/orderController')
const { checkCouponCondtion } = require('../middlewares/checkCoupon')

const router = express.Router();

router.get('/', getOrders);

router.post('/orderonline',checkCouponCondtion, createOrderOnline)

router.post('/orderoffline', createOrderOffline)

module.exports = router
