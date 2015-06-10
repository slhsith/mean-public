/* -----------------------------------------------------
   Settings, User Profiles
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');
var aws = require('aws-sdk');
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];

// --- Models --- //
var
  User          = mongoose.model('User'),
  Language      = mongoose.model('Language'),
  Follower      = mongoose.model('Follower'),
  Item          = mongoose.model('Item'),
  Event         = mongoose.model('Event');

//access keys
var AWS_ACCESS_KEY = config['AWS_ACCESS_KEY'];
var AWS_SECRET_KEY = config['AWS_SECRET_KEY'];
var S3_BUCKET = config['S3_BUCKET'];
aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
var s3 = new aws.S3();


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
    return res.json(user).populate('followers'); 
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


//get all users 
exports.getUsers = function (req, res, next) {
  // if (err) { return next(err); }
  User
    .find({})
    .limit(10)
    .find(function(err, users) {
      if (err) { return next(err); }
      res.json(users);
    });
};
//find followers function
var findFollowers = function (err, user) {
    User.find( {followers: [req.payload._id]} );
    { if(err){ return next(err); }
    console.log('User Followers', user.followers, user._id);
    return res.json(followers);
  };
};
// get items function
var getItems = function (req, res, next) {
   Item.find({})
   .populate('exercise workoutplan dietplan video book podcast')
   .exec(function(err, items){
      var result = [];
      items.forEach(function(item) {
        result.push(removeNullSubtypeFields(item));
      });
      if(err){ return next(err); }
      return res.json(result);
   });
};

// 1 User.find({followers: [req.payload._id]})
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follower' }, { _id: <deleted person> } ],
// 2 items:     [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item' } ],  
// a) remove creator._id  if you need to -- some sort of ghost state??



exports.deleteUser = function(req, res, next) {
  var user_id = req.params.id;
  var user = new User({_id: req.params.id});

  User.findById(user_id, function (err, user) {
    // case: user.items: [ ref, ref, ref ]
    Item.update(   
      {'creator._id': user_id },
      { $unset: { creator: '' } },
      function(err, item) {
        if(err){ return next(err); }
        Event.update(
          {'creator._id': user_id },
          { $unset: { creator: '' } },
          function(err, event) {
            if(err){ return next(err); }
              user.remove();
              console.log(user);
              res.json({message: 'Successfully deleted user ' + user_id, success: true});
          });
    });
  });
};

    // // user.remove();
    // if (err) { return next(err); }
    // User.findByIdAndUpdate(user_id,
    //   { $pull: {items: {_id: item_id} }}, 
    //   function (err, items) {
    //     if(err){ return next(err); }
    //     console.log(items);
    //     res.json({message: 'Successfully deleted item ' + item_id, success: true});
    // });    


//get users paginated from start to end
exports.getUsersByPage = function (req, res, next) {
  // paginate by start and end params
  var from = req.params.start || 0,
      to   = req.params.end || 20;

 if (err) { return next(err); }
 User
   .find({})
   .skip(from)
   .limit(to)
   .exec(function(err, users) {
     // if (err) { return next(err); } 
     res.json(users);
   });
};

exports.getUserById = function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.id;
 User.findById(_id, '-salt -hash', function(err, user) {
   res.json(user);
 });
};

//for public profiles
exports.getUserByHandle = function (req, res, next) {
 // if(err){ next(err); }
 var handle = req.params.handle;
 User.findOne({handle: handle}, function(err, user) {
   res.json(user);
 });
};

exports.addFollower = function (req, res, next) {
  var follower = new Follower();

  follower.save(function(err, follower) {
    if (err) { return next(err); }

    var update = { $push: { followers: follower._id }};
    var handle = req.params.handle;
    User.findOneAndUpdate({handle: handle}, update, function(err, user) {
     res.json(user);
    });
  });
};

//avatar
exports.signedRequestForAvatar = function (req, res, next) {
  console.log('sign request for', req.query);
  var avatar = req.query;

  var s3_params = {
    Bucket: S3_BUCKET,
    Key: 'images/avatar/temp/' + avatar.name,
    Expires: 120,
    ContentType: avatar.type,
    ACL: 'public-read',
    Metadata: { 'userid': req.params.id, role: 'avatar' }
  };
  s3.getSignedUrl('putObject', s3_params, function(err, data){
    if(err){ return next(err); }
    console.log(data);

    var return_data = {
      signed_request: data,
      url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+avatar.name
    };
    res.json(return_data);
  });
};

exports.updateAvatarSuccess = function(req, res, next) {
  console.log('successful upload for ' + req.payload.f_name + ' ' + req.body._id, req.body.filename, req.body.headers);
  var new_avatar_name = req.body.filename;
  // need to rename file in aws
  // need to update User object in mongo
  // respond with ultimate URL so we can preview it over in front end
  var extension = '.' + new_avatar_name.split('.').pop();
  new_avatar_name = req.payload.l_name + '_' + req.payload.f_name +
   '_' + req.params.id + '_' + new Date().getTime() + extension;
  console.log('avatar to change to key', new_avatar_name);
  var s3_params = {
    Bucket: S3_BUCKET,
    CopySource: S3_BUCKET + '/images/avatar/temp/' + req.body.filename,
    Key: 'images/avatar/' + new_avatar_name,
    ACL: 'public-read'
    // MetadataDirective: 'COPY'
  };
  s3.copyObject(s3_params, function(err, data){
    if(err){ return next(err); }
    console.log('copyObject data result', data); // data.CopyObjectResult.ETag to be compared
    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/images/avatar/'+new_avatar_name;
    if (data.ETag === req.body.headers.etag) {
      console.log('matching ETags!');
      s3.deleteObject({
        Bucket: S3_BUCKET,
        Key: '/images/avatar/temp/' + req.body.filename 
      }, function(err, data) {
          console.log('S3 delete of ' + req.body.filename, data);
      });

      User.findByIdAndUpdate(req.params.id, 
        {$set: {avatar_url: url} }, 
        {new: true}, 
        function(err, user) {
          if (err) return next(err);
          res.json(user);
      });
    }
  });
};