var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  name: String,
  type: String, // lunch, dinner, etc
  description: String
  
  day: Number,

  cooktime: Number,
  preptime: Number,

  recipes: [ ],
});

mongoose.model('Meal', MealSchema);