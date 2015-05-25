var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    
  users    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

  latest   : { timesent        : { type: Date, default: Date.now },
                 timeread      : { type: Date },
                 body          : String,
                 f_name        : String,
                 l_name        : String,
                 handle        : String,
                 user          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
                }

});

ConversationSchema.methods.readMessages = function() {
  this.upvotes += 1;
  this.save();
};

mongoose.model('Conversation', ConversationSchema);