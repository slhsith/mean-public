var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  permissions: String,
  confirmation: Boolean,
  user_token: {type: String, lowercase: true, unique: true}
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.validateUserEmailToken = function() {
  this.confirmation = true;
};

UserSchema.methods.resetUserPassword = function(email, token, password) {
  // user.findOne({ username: this.email, user_token: this.token }, function (err, docs) {
  // if (err){
  //    return err
  // }else{
  //    docs.setPassword(this.password);
  // }
  // });
};

UserSchema.methods.generateUserToken = function(){
  this.user_token = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 30);
}

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

mongoose.model('User', UserSchema);
mongoose.set('debug', true);
