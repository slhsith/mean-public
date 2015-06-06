var mongoose = require('mongoose');

var PodcastSchema = new mongoose.Schema({
  duration: String,
  genre: String,
  language: String,
  year: String,
  studio: String,
  description: String,
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});
mongoose.model('Podcast', PodcastSchema);