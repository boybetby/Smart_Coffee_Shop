const express = require("express")

const { getOrders, createOrderOnline, createOrderOffline, updateOrder, deleteOrder, findOrder } = require('../controllers/orderController')

const router = express.Router();

router.get('/', getOrders);

router.post('/orderonline', createOrderOnline)
router.post('/orderoffline', createOrderOffline)

module.exports = router
