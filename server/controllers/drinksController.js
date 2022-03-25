const  drinkModel = require('../models/drink') 

const getDrinks = async (req, res) => {
  try {
    const drinks = await drinkModel.find();
    res.status(200).json({
      success: true,
      drinks
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getDrinksByCategory = async (req, res) => {
  try {
    const category = req.body.category
    const drinks = await drinkModel.find({"category":category})

    res.status(200).json(drinks)
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const findDrink = async (req, res) => {
  try {
    const {drinkId} = req.body

    const drink = await drinkModel.findOne({drinkId})
    if(!drink){
      res.status(404).json({ 
        success: false,
        message : 'Can not find drink' 
      });
    }
    else{
      res.status(200).json({ 
        success: true,
        drink 
      });
    }
  }catch (err){
    res.status(500).json({ 
      error: err,
      message: 'Internal server error'
    });
  }
}

const createDrink = async (req, res) => {
  try {
    // const newDrink = req.body;
    let newDrink = new drinkModel({
      drinkName: req.body.drinkName,
      defaultPrice: req.body.defaultPrice,
      description: req.body.description,
      category: req.body.category
    })

    if(req.files){
      newDrink.drinkImage = `/drinks/${req.body.category}/${req.body.drinkName}.png`
    }

    const drink = new drinkModel(newDrink);

    await drink.save();

    res.status(200).json(drink);
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const updateDrink = async (req, res) => {
  try {
    const updateDrink = req.body;

    const drink = await drinkModel.findOneAndUpdate(
      { _id: updateDrink._id },
      drink,
      { new: true }
    );
    res.status(200).json(drink);
  } catch (err) {
    res.status(500).json({ 
      error: err ,
    });
  }
};

const deleteDrink = async(req, res) => {
  try {
      const drinkUpdateCondition = {
          _id : req.params.id,
          drink: req.drinkId
      }

      const deleteDrink = await drinkModel.findOneAndDelete(drinkUpdateCondition)
      
      if(!deleteDrink){
          return res.status(401).json({
              success: false,
              message: 'Drink not found'
          })
      }

      res.json({
          success: true,
          message: 'deleted successfully',
          drink: deleteDrink
      })

  } catch (error) {
      console.log(error)
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      })
  }
}


module.exports = {getDrinks, createDrink, updateDrink, deleteDrink, findDrink, getDrinksByCategory}