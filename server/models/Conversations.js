var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    
  users    : [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],

  latest   :  { time_sent     : { type: Date, default: Date.now },
                time_read     : { type: Date },
                body          : String,
                f_name        : String,
                l_name        : String,
                handle        : String,
                user_id       : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
              }

});

ConversationSchema.methods.readMessages = function() {
  // this.upvotes += 1;
  this.save();
};

mongoose.model('Conversation', ConversationSchema);