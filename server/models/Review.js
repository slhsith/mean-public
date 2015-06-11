var mongoose = require('mongoose');

var Review = new mongoose.Schema({
  creator: { f_name: String,
             l_name: String,
             handle: String,
             username: String, 
             _id     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
           },
  stars : {type: Number, min: 0, max: 5 },
  body  : String
});

mongoose.model('Review', Review);

