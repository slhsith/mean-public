var mongoose = require('mongoose');

var CookingStepSchema = new mongoose.Schema({ 
  order       : Number,
  description : String
  // photo       : 
}, {_id : false} );

var IngredientSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  // photo: { ref},

  value: Number, // 1.25
  unit: String,  // Tbs
  preparation: String,
});

var RecipeSchema = new mongoose.Schema({
  name: String,
  type: String, // entree, appetizer, snack
  description: String,

  // coverphoto: {ref}, 
  // video: {ref},
  // photos: [], 

  yield: Number, // servings
  cost: Number,
  cook_time: Number,
  prep_time: Number,
  equipment: String,
  steps: [ CookingStepSchema ],
  ingredients: [ { ingredient : { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
                   name  : String,
                   amount: { value: Number, // 1.25
                             unit: String  // Tbs
                            },
                   preparation: String, 
                   note: String
                  } 
               ],

  calories: Number,
  fats: Number,
  carbs: Number,
  proteins: Number
  
});

mongoose.model('CookingStep', CookingStepSchema);
mongoose.model('Recipe', RecipeSchema);