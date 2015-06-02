var mongoose = require('mongoose');

var WorkoutPlanSchema = new mongoose.Schema({
  name: String,
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});
mongoose.model('WorkoutPlan', WorkoutPlanSchema);