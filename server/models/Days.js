var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  day: { name: String,
         order: Number 
       },

  title: String, // for diet days
  meals: [ MealSchema ] // for diet
  dietPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }],

  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],

  item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

mongoose.model('Day', DaySchema);