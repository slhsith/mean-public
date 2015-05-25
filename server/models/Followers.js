var mongoose = require('mongoose');
var FollowerSchema = new mongoose.Schema({
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
mongoose.model('Follower', FollowerSchema);