var mongoose = require('mongoose');

var LanguageSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Language', LanguageSchema);