var mongoose = require('mongoose');

var StepSchema = new mongoose.Schema({
  title: String,
  description: String,
  length: String,
  order: Number,
});
mongoose.model('Step', StepSchema);

