var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  timesent      : {type: Date, default: Date.now },
  timeread      : {type: Date },
  body          : String,
  f_name        : String,
  l_name        : String,
  handle        : String,
  user          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversation  : { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
});


mongoose.model('Message', MessageSchema);



