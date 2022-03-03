const express = require("express")

const { getOrders, createOrderOnline, updateOrder, deleteOrder, findOrder } = require('../controllers/orderController')

const router = express.Router();

router.get('/', getOrders);

router.post('/orderonline', createOrderOnline)

module.exports = router
