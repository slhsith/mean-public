var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({

  username     : { type: String, lowercase: true, unique: true },
  hash         : String,
  salt         : String,
  permissions  : { type: String, default: 'User' },
  confirmation : Boolean,
  user_token   : { type: String, lowercase: true, unique: true },
  created      : { type: Date, default: Date.now },

  f_name       : String,
  l_name       : String,
  address      : String,
  dob          : String,
  handle       : { type: String, unique: true },
  avatar_url   : String,
  facebook     : { id         : String,
                   token      : String,
                   email      : String,
                   first_name : String,
                   last_name  : String },
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],

  stripe_id: String,
  stripe_card: [ { id: String, last4: String, name: String, brand: String, exp_month: Number, exp_year: Number }  ],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  
  
  items: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item' } ], // created_by
  events: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Event' } ],
  dietPlans: [ { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan'} ], //create_by

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follower' }]

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

UserSchema.methods.resetUserPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.generateUserToken = function(){
  this.user_token = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 30);
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    f_name: this.f_name,
    l_name: this.l_name,
    permissions: this.permissions,
    stripe_id: this.stripe_id,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

mongoose.model('User', UserSchema);
mongoose.set('debug', true);
