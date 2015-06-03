var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  pages: String,
  genre: String,
  language: String,
  year: String,
  publisher: String,
  isbn: String,
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});
mongoose.model('Book', BookSchema);