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
  
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

mongoose.model('Bootcamp', BootcampSchema);