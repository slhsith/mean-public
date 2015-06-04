var mongoose = require('mongoose');

var Meal = mongoose.model('Meal');

var DaySchema = new mongoose.Schema({
  day: { name: String,
         order: Number 
       },

  title: String, // for diet days
  meals: [ Meal ], // for diet

  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],

  item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

mongoose.model('Day', DaySchema);