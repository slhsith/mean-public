var mongoose = require('mongoose');


var ItemSchema = new mongoose.Schema({

  name: String,
  creator: { f_name: String,
             l_name: String,
             handle: String,
             username: String, 
             _id     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
           },

  price   : Number, // in cents
  currency: String,
  upvotes : {type: Number, default: 0},
  reviews : { count: {type: Number, default: 0}, // how many reviews total, $inc when new in
               refs: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Review'} ],
            average: { type: Number }
            },

  type: String, 
  workoutplan : {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan'},
  dietplan    : {type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan'},
  video       : {type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
  book        : {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
  podcast     : {type: mongoose.Schema.Types.ObjectId, ref: 'Podcast'},

  // this could grow insane, maybe better to do Transactions.find({item_id: _id})
  // TODO REFACTOR
  transactions: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'} ],
  signups     : Number // holds number of people who have purchased/signed up etc

});

mongoose.model('Item', ItemSchema);
