var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0},
  author: String,
  price: String,
  type: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  video: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  podcast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
  dietPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }],
  bootcamp: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bootcamp' }],
});
ItemSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Item', ItemSchema);