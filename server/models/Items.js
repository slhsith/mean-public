var mongoose = require('mongoose');


var ItemSchema = new mongoose.Schema({

  name       : String,
  creator    : { f_name: String,
                 l_name: String,
                 handle: String,
                 username: String, 
                 _id     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
               },

  type       : String, 
  description: String,

  price : {
              value: Number, // in cents
              currency: { type: String, default: 'USD' }
           },

  upvotes : {type: Number, default: 0},

  details  : {
                duration : Number, // minutes, for diets: days
                pages    : Number, // for books
                genre    : String,
                language : String,
                year     : Number,
                studio   : String,
                publisher: String,
                isbn     : String,
                hashtag  : String, 
                demo_gender: String,
                demo_age : { max: Number, min: Number },
                category : String, // e.g. weight loss
              },

  assets : {
       cover_photo_url: { front: String, back: String },
       photo_urls     : [ String ], 
       video_urls     : [ String ], 
  },
             
  workoutplan : {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan'},
  dietplan    : {type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan'},

  // this could grow insane, maybe better to do Transactions.find({item_id: _id})
  transactions: Number //a count for signups/purchases
   // [ {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'} ],

});

mongoose.model('Item', ItemSchema);
