var mongoose = require('mongoose');

var TimestampSchema = new mongoose.Schema({ 
  user          :  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  time          :  {type: Date, default: Date.now }
}, {_id : false} );

var MessageSchema = new mongoose.Schema({
  time_sent     : {type: Date, default: Date.now },
  time_read     : [TimestampSchema],
  users_read    : [],
  body          : String,
  f_name        : String,
  l_name        : String,
  handle        : String,
  user          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversation  : { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
});


mongoose.model('Message', MessageSchema);
mongoose.model('Timestamp', TimestampSchema);



