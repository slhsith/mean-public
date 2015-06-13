var mongoose = require('mongoose');

var DietPlanSchema = new mongoose.Schema({

  days_set    : { type: Number, default: 0 },
  days        : [  ]

});
// }, { strict: false} );

mongoose.model('DietPlan', DietPlanSchema);
