const express = require("express")

const { getDrinks, findDrink, createDrink, getDrinksByCategory } = require('../controllers/drinksController')
const { upload } = require('../middlewares/multer')


const router = express.Router();

router.get('/', getDrinks);

router.get('/findbycategory', getDrinksByCategory)

router.get('/detail/:id', findDrink);

router.post('/', upload.array('drinkImage'), createDrink);


module.exports = router
