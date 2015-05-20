/* -----------------------------------------------------
   Posts and Comments
   ----------------------------------------------------- */
   
// --- Module Dependencies ---
var mongoose = require('mongoose');

// --- Models ---
var
  Post          = mongoose.model('Post'),
  Comment       = mongoose.model('Comment');

// --- Exported Methods ---
exports.getPosts = function(req, res, next) {
  Post.find({}, function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
};

exports.createPost = function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
};

exports.getPostByIdParam = function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
};

exports.getPostById = function(req, res, next) {
  var _id = req.params.post;
  Post.findById(_id)
  .populate('comments')
  .exec(function(err, post) {
    if (err) { return next(err); }
    console.log(post);
    res.json(post);
  });
};

exports.upvotePost = function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
};


exports.createComment = function(req, res, next) {
  var comment = new Comment(req.body);
  var post_id = req.body.post;

  comment.save(function(err, comment) {
    if (err) { return next(err); }

    var update = { $push: { comments: comment._id }};

    Post.findByIdAndUpdate(post_id, update)
    .exec(function(err, post) {
      if(err){ return next(err); }
      res.json(comment);
    });
  });
};

exports.upvoteComment = function(req, res, next) {
    // is this supposed to be comment not post upvote?
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
};

exports.getCommentByIdParam = function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
};
