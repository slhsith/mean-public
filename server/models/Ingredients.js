var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
  name: String,
  category: String,
  keywords: [ String ]
  // photo: { ref},

});

mongoose.model('Ingredient', IngredientSchema);