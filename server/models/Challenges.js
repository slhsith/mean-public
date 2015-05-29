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
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});

mongoose.model('Challenge', ChallengeSchema);