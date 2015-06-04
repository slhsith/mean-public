var mongoose = require('mongoose');

// ItemSchema
// name: String,
// upvotes: {type: Number, default: 0},
// author: String,
// price: String,
// type: String,

var DietPlanSchema = new mongoose.Schema({
  description : String,
  type        : String, // e.g. weight loss
  hashtag     : String,

  duration    : Number, // days
  gender      : String,
  age         : Number,
  meals       : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
});

mongoose.model('DietPlan', DietPlanSchema);