const express = require("express")

const { getClasses, findClass, findClassWithId, createClass } = require('../controllers/classesController')


const router = express.Router();

router.get('/', getClasses);

router.get('/findclass', findClass);

router.post('/', createClass);

router.post('/findClassWithId', findClassWithId);


module.exports = router
