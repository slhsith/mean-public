var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe');

var MealSchema = new mongoose.Schema({
  name: String,
  type: String, // lunch, dinner, etc
  description: String,
  
  cooktime : Number,
  preptime : Number,
  cost     : Number,

  recipes  : [ Recipe ]
});

mongoose.model('Meal', MealSchema);
