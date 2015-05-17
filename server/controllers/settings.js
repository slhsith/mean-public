/* -----------------------------------------------------
   Settings, User Profiles
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');

// --- Models --- //
var
  User          = mongoose.model('User'),
  Language      = mongoose.model('Language');


// --- Exported Methods --- //
exports.getLanguages = function (req, res, next) {
  Language.find({}, function(err, languages){
    if(err){ return next(err); }
    res.json(languages);
  });
};

exports.createLanguage = function (req, res, next) {
  var language = new Language(req.body);
  // language.user = payload.username;
  language.save(function(err, language){
  if (err) { return next(err); }
    res.json(language);
  })
};

exports.getSettings = function (req, res, next) {
  User.findOne({username : req.body.username}, function(err, user)
  { console.log('user settings', user); res.json(user); })
};

exports.updateSettings = function (req, res, next) {
  var settings = req.body;

  User.findByIdAndUpdate(req.body._id, { $set: settings } , function (err, user) {
    if (err) { return next(err); }
    user.save(function (err){
      if(err){ return next(err); }
      return res.status(200).json({message: 'Profile Updated!'});
    });
  });
};

//search

exports.submitSearch = function (req, res, next) {
  var query = req.params.query;
  User.find({f_name: query})
  .limit(10)
  .exec(function (err,users) {
   console.log(users);
   res.json(users); 
  });
};

//get users
exports.getUsers = function (req, res, next) {
  User.find({}, function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
};

exports.getUserById = function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.id;
 User.findById(_id, function(err, user) {
   console.log(user);
   res.json(user);
 });
};

//for public profiles
exports.getUserByHandle = function (req, res, next) {
 // if(err){ next(err); }
 var handle = req.params.handle;
 User.findOne({handle: handle}, function(err, user) {
   console.log(user);
   res.json(user);
 });
};