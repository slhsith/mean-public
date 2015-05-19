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
    if (err) { return next(err); }
    return res.json(languages);
  });
};

exports.createLanguage = function (req, res, next) {
  var language = new Language(req.body);
  // language.user = payload.username;
  language.save(function(err, language) {
    if (err) { return next(err); }
    return res.json(language);
  });
};

exports.getSettings = function (req, res, next) {
  if (err) { return next(err); }
  User.findOne({username : req.body.username}, function(err, user) {
    console.log('user settings', user);
    return res.json(user); 
  });
};

exports.updateSettings = function (req, res, next) {
  var settings = req.body;

  User.findByIdAndUpdate(req.body._id, { $set: settings }, function (err, user) {
    if (err) { return next(err); }
    user.save(function(err) {
      if (err) { return next(err); }
      return res.status(200).json({message: 'Profile Updated!'});
    });
  });
};

//search

exports.submitSearch = function (req, res, next) {
  // let's make our query a regex
  if (err) { return next(err); }
  var re = new RegExp(req.params.query, 'i');
  User.find()
    .or( [{f_name: { $regex: re }}, {l_name: {$regex: re}}] )
    .limit(10)
    .exec(function(err,users) {
      if (err) { return next(err); }
      console.log(users);
      return res.json(users); 
  });
};

//get users paginated from start to end
exports.getUsers = function (req, res, next) {
  // paginate by start and end params
  var from = req.params.start,
      to   = req.params.end;
      console.log(req.params);

  // if (err) { return next(err); }
  User
    .find({})
    .skip(from)
    .limit(to)
    .exec(function(err, users) {
      if (err) { return next(err); } 
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