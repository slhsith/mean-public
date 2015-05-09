var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  group_id: {type: String, lowercase: true, unique: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

GroupSchema.Methods.createGroupId = function(){
   this.group_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 30);
};

mongoose.model('Group', GroupSchema);
