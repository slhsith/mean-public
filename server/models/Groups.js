var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}); 

mongoose.model('Group', GroupSchema);
