const mongoose = require("mongoose");


//Contract of the data
const pizzaSchema = new mongoose.Schema({
    crust: String,
    cheese: String,
    sauce: String,
    toppings: [String]
});

//convert Schema into model
const Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = {
    model: Pizza,
    schema: pizzaSchema
  };