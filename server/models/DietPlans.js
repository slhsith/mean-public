var mongoose = require('mongoose');


var Day = mongoose.model('Day');

var DietPlanSchema = new mongoose.Schema({

  item        : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },

  description : String,
  category    : String, // e.g. weight loss
  hashtag     : String,

  duration    : Number, // days
  gender      : String,
  maxage      : Number,
  minage      : Number,

  days        : [ Day ]

});

mongoose.model('DietPlan', DietPlanSchema);
