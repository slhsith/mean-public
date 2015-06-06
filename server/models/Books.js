var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  pages    : Number,
  genre    : String,
  language : String,
  year     : Number,
  publisher: String,
  isbn     : String,
  item     : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});

mongoose.model('Book', BookSchema);