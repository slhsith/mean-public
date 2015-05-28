var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  day: String,
  dietPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});
mongoose.model('Day', DaySchema);