var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  day: String,
  dietPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});
mongoose.model('Day', DaySchema);