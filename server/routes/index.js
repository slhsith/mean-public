var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Item = mongoose.model('Item');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


router.get('/api/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/api/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('/api/post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.get('/api/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});


router.put('/api/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/api/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.put('/api/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

//Items
router.get('/api/items', function(req, res, next) {
  Item.find(function(err, items){
    if(err){ return next(err); }

    res.json(items);
  });
});

router.post('/api/items', auth, function(req, res, next) {
  var item = new Item(req.body);
  item.author = req.payload.username;

  item.save(function(err, item){
    if(err){ return next(err); }

    res.json(item);
  });
});

router.param('/api/item', function(req, res, next, id) {
  var query = Item.findById(id);

  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error('can\'t find item')); }

    req.item = item;
    return next();
  });
});

router.get('/api/items/:item', function(req, res, next) {

    res.json(item);
});


router.put('/api/items/:item/upvote', auth, function(req, res, next) {
  req.item.upvote(function(err, item){
    if (err) { return next(err); }

    res.json(item);
  });
});

router.post('/api/register', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.repeat_username || !req.body.repeat_password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  if(req.body.username !== req.body.repeat_username){
    return res.status(400).json({message: 'Emails do not match'});
  }
  if(req.body.password !== req.body.repeat_password){
    return res.status(400).json({message: 'Passwords do not match'});
  }

  // var checkEmail = function () {
  //   User.findOne({ username: req.body.username }, function (err, user) {
  //     if (user){ Console.log('email exists'); return true; }
  //     if (!user){ Console.log('email doesnt exists'); return false; }
  //   });
  // };

  // if (checkEmail()){
  // return res.status(400).json({message: 'Email is in use'});
  // }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.generateUserToken();

  var mailer   = require("mailer")
  , username = "trainersvault"
  , password = "BGkIPqtGVLNL2JAGAmwHMw";

  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
    mailer.send(
      { host:           "smtp.mandrillapp.com"
      , port:           587
      , to:             "thomas@trainersvault.com"
      , from:           "contact@trainersvault.com"
      , subject:        "Welcome to Trainersvault"
      , body:           "Welcome to your new profile" + user.username + "! Please Click this link to validate your email! \n Link: http://localhost:3000/emailverify/" + user.username + "/" + user.user_token + "\n Thank you for using Trainersvault!"
      , authentication: "login"
      , username:       "trainersvault"
      , password:       "BGkIPqtGVLNL2JAGAmwHMw"
      }, function(err, result){
        if(err){
          console.log(err);
        } else {
          console.log('Success!');
        }
      }
    );    
});

router.post('/api/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate(['local', 'facebook'], function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/api/forgot', function(req, res, next){
  if(!req.body.username){
    return res.status(400).json({message: 'Please enter an email'});
  }


  var validEmail = function () {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (!user) { return res.status(400).json({message:'Email not found'}); return false; }
      if (user){ console.log(user.token) }
    })
  };

  var mailer   = require("mailer")
  , username = "trainersvault"
  , password = "BGkIPqtGVLNL2JAGAmwHMw";

  var resetPassword = function(user){
    mailer.send(
      { host:           "smtp.mandrillapp.com"
      , port:           587
      , to:             user.username
      , from:           "contact@trainersvault.com"
      , subject:        "Trainersvault Reset Password"
      , body:           "Please Click this link to reset your password! \n Link: http://localhost:3000/passwordreset/" + user.username + "/" + user.user_token + "\n Thank you for using Trainersvault!" 
      , authentication: "login"
      , username:       "trainersvault"
      , password:       "BGkIPqtGVLNL2JAGAmwHMw"
      });
    console.log('Success');
    // return res.status(200).json({message: 'Check your email for reset password!'});
  };

  // validEmail();
  if (validEmail()){resetPassword()}
});

// router.put('/emailverify/:username/:token', function(req, res, next){
//   user.validateUserEmailToken()
//   window.location = "http://localhost:3000/user/#/home";
// });


//Facebook Integration
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
