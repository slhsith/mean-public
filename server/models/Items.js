var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0},
  price: String,
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  video: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  podcast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
});
ItemSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Item', ItemSchema);