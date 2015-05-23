var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    
  users    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

  lastmessage: { timesent      : {type: Date },
                 timeread      : {type: Date },
                 body          : String,
                 f_name        : String,
                 l_name        : String,
                 handle        : String,
                 user          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
                }

});

// ConversationSchema.methods.upvote = function(cb) {
  // this.upvotes += 1;
  // this.save(cb);
// };

mongoose.model('Conversation', ConversationSchema);