var mongoose = require('mongoose');


var Day = mongoose.model('Day');
var Recipe = mongoose.model('Recipe');

var MealSchema = new mongoose.Schema({
  name: String,
  type: String, // lunch, dinner, etc
  description: String
  
  cooktime : Number,
  preptime : Number,
  cost     : Number,

  recipes: [ Recipe ],
});

var DietPlanSchema = new mongoose.Schema({

  item        : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },

  description : String,
  category    : String, // e.g. weight loss
  hashtag     : String,

  duration    : Number, // days
  gender      : String,
  maxage      : Number,
  minage      : Number,

  days        : [ Day ],

});

mongoose.model('DietPlan', DietPlanSchema);
mongoose.model('Meal', MealSchema);
mongoose.model('Day', DaySchema);