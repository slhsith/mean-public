var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

  name    : String,
  creator: { f_name: String,
             l_name: String,
             handle: String,
             username: String, 
             _id     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
           },

  price: String,
  upvotes: {type: Number, default: 0},

  type: String,

  bootcamp  : { type: mongoose.Schema.Types.ObjectId, ref: 'Bootcamp' },
  challenge : { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  session   : { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },

  // this could grow insane, maybe better to do Transactions.find({item_id: _id})
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],

});

mongoose.model('Event', EventSchema);