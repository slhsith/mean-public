var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  gposts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Gpost' } ]
}); 

mongoose.model('Group', GroupSchema);
