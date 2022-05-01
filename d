[1mdiff --git a/admin/src/components/dashboard-sidebar.js b/admin/src/components/dashboard-sidebar.js[m
[1mindex ef2629c..e6d90cb 100644[m
[1m--- a/admin/src/components/dashboard-sidebar.js[m
[1m+++ b/admin/src/components/dashboard-sidebar.js[m
[36m@@ -83,11 +83,6 @@[m [mexport const DashboardSidebar = (props) => {[m
         icon: (<ChartBarIcon fontSize="small" />),[m
         title: 'Dashboard'[m
       },[m
[31m-      {[m
[31m-        href: '/customers',[m
[31m-        icon: (<UsersIcon fontSize="small" />),[m
[31m-        title: 'Customers'[m
[31m-      },[m
       {[m
         href: '/products',[m
         icon: (<ShoppingBagIcon fontSize="small" />),[m
[1mdiff --git a/server/controllers/couponsController.js b/server/controllers/couponsController.js[m
[1mindex 0ef64b7..d0952dc 100644[m
[1m--- a/server/controllers/couponsController.js[m
[1m+++ b/server/controllers/couponsController.js[m
[36m@@ -159,7 +159,6 @@[m [mconst checkCouponCondition = async(req, res) => {[m
       const data = req.body[m
       const customer = await customerModel.findOne({username: data.customer})[m
       const find = await customerCouponModel.find({customerId: customer._id, isCreated: true})[m
[31m-      console.log(find)[m
       const coupons = [][m
       var date = new Date();[m
       try {   [m
[1mdiff --git a/server/routers/classRouter.js b/server/routers/classRouter.js[m
[1mdeleted file mode 100644[m
[1mindex 89b7f9f..0000000[m
[1m--- a/server/routers/classRouter.js[m
[1m+++ /dev/null[m
[36m@@ -1,17 +0,0 @@[m
[31m-const express = require("express")[m
[31m-[m
[31m-const { getClasses, findClass, findClassWithId, createClass } = require('../controllers/classesController')[m
[31m-[m
[31m-[m
[31m-const router = express.Router();[m
[31m-[m
[31m-router.get('/', getClasses);[m
[31m-[m
[31m-router.get('/findclass', findClass);[m
[31m-[m
[31m-router.post('/', createClass);[m
[31m-[m
[31m-router.post('/findClassWithId', findClassWithId);[m
[31m-[m
[31m-[m
[31m-module.exports = router[m
