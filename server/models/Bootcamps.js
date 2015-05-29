var mongoose = require('mongoose');

var BootcampSchema = new mongoose.Schema({
  hashtag: String,
  recurrence: String,
  location: String,
  date: Date,
  time: String,
  max_attendance: Number,
  duration: String,
  demo_gender: String,
  demo_age: String,
  description: String,
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});

mongoose.model('Bootcamp', BootcampSchema);