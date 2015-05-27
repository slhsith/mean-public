var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  day: String,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});
mongoose.model('DietPlan', DietPlanSchema);