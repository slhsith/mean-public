var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  upvotes: {type: Number, default: 0}
});
ItemSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Item', ItemSchema);