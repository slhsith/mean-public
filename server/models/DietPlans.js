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

  days_set    : { type: Number, default: 0 },
  days        : [  ]


});
// }, { strict: false} );

mongoose.model('DietPlan', DietPlanSchema);
