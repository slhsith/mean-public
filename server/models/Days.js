var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

var MealSchema = new mongoose.Schema({
  name: String,
  type: String, // lunch, dinner, etc
  description: String,
  
  cooktime : Number,
  preptime : Number,
  cost     : Number,

  recipes: [ Recipe ],
});

var DaySchema = new mongoose.Schema({
  day: { name: String,
         order: Number 
       },

  title: String, // for diet days
  meals: [ MealSchema ], // for diet

  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],

  item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

mongoose.model('Meal', MealSchema);
mongoose.model('Day', DaySchema);