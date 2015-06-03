var mongoose = require('mongoose');

var CreatorSchema = new mongoose.Schema({
  username : String,
  _id      : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var ItemSchema = new mongoose.Schema({

  name: String,
  creator: CreatorSchema,

  price: String,
  upvotes: {type: Number, default: 0},

  type: String,

  workoutplan : { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
  dietplan    : { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' },
  video       : { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  book        : { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  podcast     : { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' },

  // this could grow insane, maybe better to do Transactions.find({item_id: _id})
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]


});

mongoose.model('Creator', CreatorSchema);
mongoose.model('Item', ItemSchema);

