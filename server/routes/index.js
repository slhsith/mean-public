var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Item = mongoose.model('Item');
var User = mongoose.model('User');
var Language = mongoose.model('Language');
var Video = mongoose.model('Video');
var Book = mongoose.model('Book');
var Podcast = mongoose.model('Podcast');
var passport = require('passport');
var jwt = require('express-jwt');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser'),    
    jsonParser = bodyParser.json();    
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
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
  }).then(function () {
    if (req.body.type === 'Video'){
      var video = new Video(req.body);
      video.author = req.payload.username;

      video.save(function(err, video){
        if(err){ return next(err); }

        res.json(video);
      });
    }

    if (req.body.type === 'Book'){
      var book = new Book(req.body);
      book.author = req.payload.username;

      book.save(function(err, book){
        if(err){ return next(err); }

        res.json(book);
      });
    }

    if (req.body.type === 'Podcast'){
      var podcast = new Podcast(req.body);
      podcast.author = req.payload.username;

      podcast.save(function(err, podcast){
        if(err){ return next(err); }

        res.json(podcast);
      });
    }
  }) 
});

router.get('/api/videos', function(req, res, next) {
  Video.find(function(err, videos){
    if(err){ return next(err); }

    res.json(videos);
  });
});

router.post('/api/videos', auth, function(req, res, next) {
  
});

router.post('/api/books', auth, function(req, res, next) {
  var book = new Book(req.body);
  book.author = req.payload.username;

  book.save(function(err, book){
    if(err){ return next(err); }

    res.json(book);
  });
});

router.post('/api/podcasts', auth, function(req, res, next) {
  var podcast = new Podcast(req.body);
  podcast.author = req.payload.username;

  podcast.save(function(err, podcast){
    if(err){ return next(err); }

    res.json(podcast);
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

router.get('/api/items/:item', function(req, res) {
    res.json(req.item);
});


router.put('/api/items/:item/upvote', auth, function(req, res, next) {
  req.item.upvote(function(err, item){
    if (err) { return next(err); }

    res.json(item);
  });
});

//item page & transaction
router.post('/api/transactions', auth, function(req, res, next) {
  stripe.token.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2016,
      "cvc": '123'
    }
  }, function(err, token) {
    // asynchronously called
  });
});

//transaction page & create customer
router.get('/api/transactions', function(req, res, next) {
  Transaction.find(function(err, transactions){
    if(err){ return next(err); }

    res.json(transactions);
  });
});

router.get('/api/transactions/:transaction', function(req, res) {
    res.json(req.transaction);
});

router.post('/api/transaction/:transaction/customers', auth, function(req, res, next) {
  var customer = new customer(req.id);
  customer.transaction = req.transaction;
  customer.author = req.payload.username;

  customer.save(function(err, customer){
    if(err){ return next(err); }

    req.transaction.customers.push(customer);
    req.transaction.save(function(err, transaction) {
      if(err){ return next(err); }

      res.json(customer);
    });
  });
});

//customers
router.get('/api/customers', function(req, res, next) {
  Customer.find(function(err, customers){
    if(err){ return next(err); }

    res.json(customers);
  });
});


router.get('/api/customers/:customer', function(req, res) {
    res.json(req.customer);
});


//auth

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

  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });

  var mailOptions = {
    from: 'contact@trainersvault.com', // sender address 
    to: user.username, // list of receivers 
    subject: 'Welcome to Your new Profile!', // Subject line 
    text: "Please Click this link to verify your account! \n Link: http://localhost:3000/set/emailVerify/" + user.username + "/" + user.user_token + "\n Thank you for using Trainersvault!", // plaintext body 
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
  });   
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
      if (user){
        var transporter = nodemailer.createTransport({
          host: 'smtp.mandrillapp.com',
          port: 587,
          auth: {
              user: 'trainersvault',
              pass: 'BGkIPqtGVLNL2JAGAmwHMw'
          }
        });
        var mailOptions = {
          from: 'contact@trainersvault.com', // sender address 
          to: user.username, // list of receivers 
          subject: 'Trainersvault Reset Password', // Subject line 
          text: "Please Click this link to reset your password! \n Link: http://localhost:3000/set/#/resetPassword/" + user.username + "/" + user.user_token + "\n Thank you for using Trainersvault!", // plaintext body 
        }; 
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          }
        });
      }
    })
  };
  validEmail();
});

router.put('/emailverify/:username/:user_token', function (req, res, next) {
  user.validateUserEmailToken()
});

router.get('/emailVerify/:username/:user_token', function (req, res, next) {
  if (!user.username || !user.user_token){
    false 
  } else {
    true
  }
});

router.get('/resetPassword/:username/:user_token', function (req, res, next) {
  User.findOne({ username: req.param.username, token: req.param.user_token }, function (err, user) {
      if (!user) { return res.status(400).json({message:'Email not found'}); return false; }
      if (user){
        return true;
      }
    })
});

router.put('/api/resetPassword/:username/:token', function (req, res, next) {
  // if(req.body.password !== req.body.repeat_password){
  //   return res.status(400).json({message: 'Passwords do not match'});
  // }
  var validate = function (password) {
    User.findOne({ username: req.params.username }, function (err, user) {
      if (!user) { return res.status(400).json({message:'Token expired'}); return false; }
      if (user){ user.resetUserPassword(password)
                 user.save(function (err){
                  if(err){ return next(err); }
                  return res.json({token: user.generateJWT()})
                 }) }
    })
  };
  validate();
});

router.get('/api/settings/languages', function (req, res, next) {
  Language.find(function(err, languages){
    if(err){ return next(err); }

    res.json(languages);
  });
});

router.post('/api/settings/languages', function (req, res, next) {
  // req.body.name = languageName;

  // test(function () {
  //   return res.json({message: req.body.name});
  // });
  var language = new Language(req.body);
  language.user = req.user;

  language.save(function(err, languages){
    if(err){ return next(err); }
    req.user.languages.push(language);
    req.user.save(function(err, post) {
      if(err){ return next(err); }

      res.json(language);
    });
  });
});

router.get('/api/settings/', auth, function (req, res, next) {
  // User.find(function(err, users){
  //   if(err){ return next(err); }

  //   res.json(users);
  // });
  var sid = req.session.id;
  var username = req.payload.username;

  users.findOne({username : username}, function(err, result)
  { res.json(settings); })
});

router.put('/api/settings/', function (req, res, next) {
  var username = req.payload.username;

  users.findOne({username : username}, function(err, result){
    user.f_name = req.body.f_name;
    user.l_name = req.body.l_name;
    user.address = req.body.address;
    user.dob = req.body.dob;
    user.handle = req.body.handle;

    user.save(function (err){
      if(err){ return next(err); }
      return res.json({token: user.generateJWT()})
    });
  });
});

//search

router.post('/api/search', function (req, res, next) {
  var searchQuery = req.payload.search;


})

//Facebook Integration
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

