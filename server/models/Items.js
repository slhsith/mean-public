var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0},
  author: String,
  price: String,
  type: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  podcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
  dietPlans: [{ category: String , days: [{ day: String, meals : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }]}]}],
  bootcamps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bootcamp' }],
});
mongoose.model('Item', ItemSchema);