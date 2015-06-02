var mongoose = require('mongoose');

var CookingStepSchema = new mongoose.Schema({ 
  order       : Number,
  description : String
  // photo       : 
}, {_id : false} );

var RecipeSchema = new mongoose.Schema({
  name: String,
  type: String, // entree, appetizer, snack
  description: String,

  // coverphoto: {ref}, 
  // video: {ref},
  // photos: [], 

  yield: Number, // servings
  cost: Number,
  cooktime: Number,
  preptime: Number,
  equipment: String,
  steps: [ CookingStepSchema ],

  calories: Number,
  fats: Number,
  carbs: Number,
  proteins: Number
  
});

mongoose.model('Recipe', RecipeSchema);