var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var bodyParser = require('body-parser'),    
    jsonParser = bodyParser.json();    
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Mandrill',
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: 'trainersvault',
        pass: 'BGkIPqtGVLNL2JAGAmwHMw'
    }
  });
var stripe = require('stripe')('sk_test_z1OaqEIX71PB6nqiDgZ8bfLE');

// Models
var
  Post          = mongoose.model('Post'),
  Comment       = mongoose.model('Comment'),

  User          = mongoose.model('User'),
  Language      = mongoose.model('Language'),

  Group         = mongoose.model('Group');


// API controllers
var shop = require('../controllers/shop');
var posts = require('../controllers/posts');
var messaging = require('../controllers/messaging');

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//posts

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

    res.json(req.post);
  });
});

router.put('/api/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

//post page & comments
router.get('/api/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    res.json(req.post);
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

// # Shop
// Items
router.get('/api/items', shop.getItems );
router.post('/api/items', auth, shop.postItem );
router.param('/api/item', shop.getItemByIdParam );
router.get('/api/items/:item', shop.getItemById );
router.put('/api/items/:item/upvote', auth, shop.upvoteItem )

// Item page & transaction
router.post('/api/transactions', auth, shop.createTransaction );
//transaction page & create customer
router.get('/api/transactions', shop.getTransactions );
router.get('/api/transactions/:transaction', shop.getTransactionById );
router.post('/api/transaction/:transaction/customers', auth, shop.createCustomerOnTransaction );

//customers
router.get('/api/customers', shop.getCustomers );
router.get('/api/customers/:customer', shop.getCustomerById );


// # GROUP WALL PAGE
///////////////////////////

router.get('/api/groups', function(req, res, next) {
  Group.find({},function(err, groups){
    if(err){ return next(err); }

    res.json(groups)
  });
});

router.post('/api/groups', function (req, res, next) {
  var group = new Group(req.body);
  group.save(function(err, group){
    if(err){ return next(err); }
    res.json(group);
  });
});

router.get('/api/group/:id', function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.id;
 Group.findById(_id, function(err, group) {
  console.log(group);
   res.json(group);
 })
});

router.param('/api/group', function(req, res, next, id) {
  var query = Group.findById(id);

  query.exec(function (err, group){
    if (err) { return next(err); }
    if (!group) { return next(new Error('can\'t find group')); }

    req.group = group;
    return next();
  });
});

router.get('/api/gposts', function(req, res, next) {
  Gpost.find(function(err, gposts){
    if(err){ return next(err); }

    res.json(gposts);
  });
});

router.post('/api/gposts', auth, function(req, res, next) {
  var gpost = new Gpost(req.body);
  gpost.author = req.payload.username;

  gpost.save(function(err, gpost){
    if(err){ return next(err); }

    res.json(gpost);
  });
});

router.param('/api/gpost', function(req, res, next, id) {
  var query = Gpost.findById(id);

  query.exec(function (err, gpost){
    if (err) { return next(err); }
    if (!gpost) { return next(new Error('can\'t find group post')); }

    req.gpost = gpost;
    return next();
  });
});

router.get('/api/gposts/:gpost', function(req, res, next) {
  req.gpost.populate('gcomments', function(err, post) {
    if (err) { return next(err); }

    res.json(req.gpost);
  });
});

router.put('/api/gposts/:gpost/upvote', auth, function(req, res, next) {
  req.gpost.upvote(function(err, gpost){
    if (err) { return next(err); }

    res.json(req.gpost);
  });
});

//post page & comments
router.get('/api/gposts/:gpost', function(req, res, next) {
  req.gpost.populate('gcomments', function(err, gpost) {
    res.json(req.gpost);
  });
});


router.post('/api/gposts/:gpost/gcomments', auth, function(req, res, next) {
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
});

router.put('/api/gposts/:gpost/gcomments/:gcomment/upvote', auth, function(req, res, next) {
  req.gpost.upvote(function(err, gpost){
    if (err) { return next(err); }

    res.json(gpost);
  });
});

router.param('gcomment', function(req, res, next, id) {
  var query = Gcomment.findById(id);

  query.exec(function (err, gcomment){
    if (err) { return next(err); }
    if (!gcomment) { return next(new Error('can\'t find comment')); }

    req.gcomment = gcomment;
    return next();
  });
});


//auth
var authentication = require('../controllers/authentication');
router.post('/api/register', authentication.doRegistration );
router.post('/api/login', authentication.doLogin );
router.post('/api/forgot', authentication.recoverPassword );
router.put('/api/emailverify/:username/:user_token', authentication.verifyEmail );
router.get('/api/resetpassword/:username/:user_token', authentication.getResetPassword );
router.put('/api/resetpassword/:username/:user_token', authentication.doResetPassword );
//Facebook Integration
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


//settings
router.get('/api/languages', function (req, res, next) {
  Language.find({}, function(err, languages){
    if(err){ return next(err); }
    res.json(languages);
  });
});

router.post('/api/languages', function (req, res, next) {
  var language = new Language(req.body);
  // language.user = payload.username;
  language.save(function(err, language){
  if (err) { return next(err); }
    res.json(language);
  })
});

router.get('/api/settings', function (req, res, next) {
  User.findOne({username : req.body.username}, function(err, user)
  { console.log('user settings', user); res.json(user); })
});

router.put('/api/settings', function (req, res, next) {
  var settings = req.body;

  User.findByIdAndUpdate(req.body._id, { $set: settings } , function (err, user) {
    if (err) { return next(err); }
    user.save(function (err){
      if(err){ return next(err); }
      return res.status(200).json({message: 'Profile Updated!'});
    });
  });
});

//search

router.get('/api/search/:query', function (req, res, next) {
  var query = req.params.query;
  User.find({f_name: query})
  .limit(10)
  .exec(function (err,users) {
  console.log(users);
   res.json(users); 
  });
});


//get users
router.get('/api/users', function (req, res, next) {
  User.find({}, function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
});

router.get('/api/user/:id', function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.id;
 User.findById(_id, function(err, user) {
   console.log(user);
   res.json(user);
 });
});
//for public profiles
router.get('/api/user/handle/:handle', function (req, res, next) {
 // if(err){ next(err); }
 var handle = req.params.handle;
 User.findOne({handle: handle}, function(err, user) {
   console.log(user);
   res.json(user);
 });
});



//Messenger
router.get('/api/conversations', messaging.getConversations );
router.get( '/api/conversation/:id', messaging.getConversationById );

router.post('/api/conversation', auth, messaging.createConversation );
router.post('/api/conversation/:id', auth, messaging.createMessage );
