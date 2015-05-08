var mongoose = require('mongoose');

var GcommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  gposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gpost' }]
});

GcommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Gcomment', GcommentSchema);