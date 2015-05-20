var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
  user._id : { type: String, lowercase: true, unique: true },
  hash: String,
  salt: String,
  permissions: String,
  confirmation: Boolean,
  user_token: { type: String, lowercase: true, unique: true },
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
  f_name: String,
  l_name: String,
  address: String,
  dob: String,
  handle: { type: String, unique: true },
  stripeToken: String,
  created: { type: Date, default: Date.now }
});