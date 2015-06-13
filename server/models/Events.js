var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

  name    : String,
  creator: { f_name: String,
             l_name: String,
             handle: String,
             username: String, 
             _id     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
           },

  type: String,
  description: String,

  price: {
           value: Number, // in cents
           currency: { type: String, default: 'USD' }
  },

  upvotes: {type: Number, default: 0},

  details  : {
                hashtag  : String, 
                recurrence : String, 
                location : String, 
                date     : { start: Date, end: Date },
                time     : { start: Date, end: Date },
                max_users: Number,
                duration : Number,
                demo_gender: String,
                demo_age: { max: Number, min: Number },
             },

  assets : {
       cover_photo_url: { front: String, back: String },
       photo_urls     : [ String ], 
       video_urls     : [ String ], 
  },
             
  challenge : { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },

  // this could grow insane, maybe better to do Transactions.find({item_id: _id})
  transactions: { type: Number, default: 0 }  // this is a count for popularity display [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],

});

mongoose.model('Event', EventSchema);
