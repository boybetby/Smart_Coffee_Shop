const express = require("express")
const { getIncomeReport, getIncomeReportByFilter } = require('../controllers/adminController')

const router = express.Router();

router.get('/income', getIncomeReport)

router.post('/incomebyfilter', getIncomeReportByFilter);

module.exports = router
