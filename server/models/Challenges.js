var mongoose = require('mongoose');

var ChallengeSchema = new mongoose.Schema({
  hashtag: String,
  recurrence: String,
  date: Date,
  time: String,
  max_attendance: Number,
  duration: String,
  demo_gender: String,
  demo_age: String,
  description: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

mongoose.model('Challenge', ChallengeSchema);