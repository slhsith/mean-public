var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  timesent      : {type: Date, default: Date.now },
  timeread      : {type: Date },
  body          : String,
  author        : String,
  conversation  : { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
});

// MessageSchema.methods.upvote = function(cb) {
  // this.upvotes += 1;
  // this.save(cb);
// };

mongoose.model('Message', MessageSchema);