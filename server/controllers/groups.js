/* -----------------------------------------------------
   Groups
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');

// --- Models --- //
var Group         = mongoose.model('Group');

// --- Exported Methods --- //
exports.getGroups = function(req, res, next) {
  Group.find({},function(err, groups){
    if(err){ return next(err); }

    res.json(groups)
  });
};

exports.createGroup = function (req, res, next) {
  var group = new Group(req.body);
  group.save(function(err, group){
    if(err){ return next(err); }
    res.json(group);
  });
};

exports.getGroupById = function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.id;
 Group.findById(_id, function(err, group) {
  console.log(group);
   res.json(group);
 })
};

exports.getGroupByIdParam = function(req, res, next, id) {
  var query = Group.findById(id);

  query.exec(function (err, group){
    if (err) { return next(err); }
    if (!group) { return next(new Error('can\'t find group')); }

    req.group = group;
    return next();
  });
};

exports.getGPosts = function(req, res, next) {
  Gpost.find({}, function(err, gposts){
    if(err){ return next(err); }

    res.json(gposts);
  });
};

exports.createGPost = function(req, res, next) {
  var gpost = new Gpost(req.body);
  gpost.author = req.payload.username;

  gpost.save(function(err, gpost){
    if(err){ return next(err); }

    res.json(gpost);
  });
};

exports.getGPostByIdParam = function(req, res, next, id) {
  var query = Gpost.findById(id);

  query.exec(function (err, gpost){
    if (err) { return next(err); }
    if (!gpost) { return next(new Error('can\'t find group post')); }

    req.gpost = gpost;
    return next();
  });
};

exports.getGPostById = function(req, res, next) {
  req.gpost.populate('gcomments', function(err, post) {
    if (err) { return next(err); }

    res.json(req.gpost);
  });
};

exports.upvoteGPost = function(req, res, next) {
  req.gpost.upvote(function(err, gpost){
    if (err) { return next(err); }

    res.json(req.gpost);
  });
};


exports.createGPostComment = function(req, res, next) {
  var gcomment = new Gcomment(req.body);
  gcomment.gpost = req.gpost;
  gcomment.author = req.payload.username;

  gcomment.save(function(err, gcomment){
    if(err){ return next(err); }

    req.gpost.gcomments.push(gcomment);
    req.gpost.save(function(err, post) {
      if(err){ return next(err); }

      res.json(gcomment);
    });
  });
};

exports.upvoteGPostComment = function(req, res, next) {
  req.gpost.upvote(function(err, gpost){
    if (err) { return next(err); }

    res.json(gpost);
  });
};

exports.getGPostCommentByIdParam = function(req, res, next, id) {
  var query = Gcomment.findById(id);

  query.exec(function (err, gcomment){
    if (err) { return next(err); }
    if (!gcomment) { return next(new Error('can\'t find comment')); }

    req.gcomment = gcomment;
    return next();
  });
};
