var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0},
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});
ItemSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Item', ItemSchema);