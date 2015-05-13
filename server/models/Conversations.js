var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
  users    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

// ConversationSchema.methods.upvote = function(cb) {
  // this.upvotes += 1;
  // this.save(cb);
// };

mongoose.model('Conversation', ConversationSchema);