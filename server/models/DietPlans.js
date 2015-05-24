var mongoose = require('mongoose');

var DietPlanSchema = new mongoose.Schema({
  category: String,
  day: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }],
});
mongoose.model('DietPlan', DietPlanSchema);