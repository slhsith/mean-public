var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  // photo: { ref},

  value: Number, // 1.25
  unit: String,  // Tbs
  preparation: String,
});

mongoose.model('Ingredient', IngredientSchema);