var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
  title: String,
  description: String,
  day: Number,
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }]
});
mongoose.model('Exercise', ExerciseSchema);