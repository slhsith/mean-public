/* -----------------------------------------------------
   Groups
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');

// --- Models --- //
var Group         = mongoose.model('Group');
var Gpost          = mongoose.model('Gpost');

// --- Exported Methods --- //
exports.getGroups = function(req, res, next) {
  Group.find({},function(err, groups){
    if(err){ return next(err); }
    res.json(groups)
  }).populate('Gposts');
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

exports.getGposts = function(req, res, next, id) {
  Gpost.find({}, function(err, gposts){
    if(err){ return next(err); }
    res.json(gposts);
  });
};

exports.createGpost = function(req, res, next) {
  var gpost = new gpost(req.body);
  gpost.author = req.payload.username;

  gpost.save(function(err, gpost){
    if(err){ return next(err); }

    res.json(gpost);
  });
};

exports.getGpostByIdParam = function(req, res, next, id) {
  var query = Gpost.findById(id);

  query.exec(function (err, gpost){
    if (err) { return next(err); }
    if (!gpost) { return next(new Error('can\'t find group post')); }

    req.gpost = gpost;
    return next();
  });
};

// exports.getGpostById = function(req, res, next) {
//   req.post.populate('comments', function(err, post) {
//     if (err) { return next(err); }

//     res.json(req.post);
//   });
// };

// exports.upvotePost = function(req, res, next) {
//   req.post.upvote(function(err, post){
//     if (err) { return next(err); }

//     res.json(req.post);
//   });
// };


// exports.createPostComment = function(req, res, next) {
//   var comment = new Comment(req.body);
//   comment.post = req.post;
//   comment.author = req.payload.username;

//   comment.save(function(err, comment){
//     if(err){ return next(err); }

//     req.post.comments.push(comment);
//     req.post.save(function(err, post) {
//       if(err){ return next(err); }

//       res.json(comment);
//     });
//   });
// };

// exports.upvotePostComment = function(req, res, next) {
//   req.post.upvote(function(err, post){
//     if (err) { return next(err); }

//     res.json(post);
//   });
// };

// exports.getPostCommentByIdParam = function(req, res, next, id) {
//   var query = Comment.findById(id);

//   query.exec(function (err, comment){
//     if (err) { return next(err); }
//     if (!comment) { return next(new Error('can\'t find comment')); }

//     req.comment = comment;
//     return next();
//   });
// };
