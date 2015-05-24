var mongoose = require('mongoose');

var DietPlanSchema = new mongoose.Schema({
  category: String,
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }],
});
mongoose.model('DietPlan', DietPlanSchema);