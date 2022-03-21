const express = require("express")
const report = require('../controllers/adminController')

const router = express.Router();

router.get('/income', report.getIncomeReport)

router.post('/incomebyfilter', report.getIncomeReportByFilter);

router.get('/products', report.getProductsReport);

router.get('/orders', report.getOrdersReport);

router.get('/customers', report.getCustomersReport);

module.exports = router
