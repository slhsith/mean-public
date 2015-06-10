var mongoose = require('mongoose');


var ItemSchema = new mongoose.Schema({

  name: String,
  creator: { username: String, 
             _id     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

           },

  price   : Number, // in cents
  currency: String,
  upvotes : {type: Number, default: 0},

  // should be lowercase so we can easily map to correct field to store ref
  type: String, 

  workoutplan : { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
  dietplan    : { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' },
  video       : { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  book        : { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  podcast     : { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' },

  // this could grow insane, maybe better to do Transactions.find({item_id: _id})
  // TODO REFACTOR
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]

});

mongoose.model('Item', ItemSchema);

