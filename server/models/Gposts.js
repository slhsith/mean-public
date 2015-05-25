var mongoose = require('mongoose');

var GpostSchema = new mongoose.Schema({
  body: String,
  author: String,
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  gcomments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gcomment' }],
  upvotes: {type: Number, default: 0}
  // gcomments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gcomment' }]
});

GpostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Gpost', GpostSchema);