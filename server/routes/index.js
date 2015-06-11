// Module Dependencies
var app = require('../../app');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var bodyParser = require('body-parser'),    
    jsonParser = bodyParser.json();    
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];
var stripe = require('stripe')(config['STRIPE_SECRET_KEY']);

// API controllers 
// the Models are referenced in those files so we don't need to declare our models here
// i.e. you can skip this ... Language      = mongoose.model('Language'),
var 
  authentication  = require('../controllers/authentication'),
  posts           = require('../controllers/posts'),
  groups          = require('../controllers/groups'),
  shop            = require('../controllers/shop'),
  events          = require('../controllers/events'),
  workoutplans    = require('../controllers/workoutplans'),
  dietplans       = require('../controllers/dietplans'),
  settings        = require('../controllers/settings'),
  transactions    = require('../controllers/transactions'),
  messaging       = require('../controllers/messaging');


/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// ------------------------ POSTS and COMMENTS  ------------------------------//
router.get('/api/posts', posts.getPosts );

router.post('/api/posts', auth, posts.createPost );
router.param('/api/post', posts.getPostByIdParam );

router.get('/api/post/:post', posts.getPostById )

router.put('/api/post/:post/upvote', auth, posts.upvotePost )
router.post('/api/post/:post/comments', auth, posts.createComment )
router.put('/api/post/:post/comment/:comment/upvote', auth, posts.upvoteComment )
router.param('comment', posts.getCommentByIdParam )


// ------------------------------- SHOP  -------------------------------------//
// ----------------- ITEMS and TRANSACTIONS and CUSTOMERS --------------------//
// Items
router.get('/api/items', shop.getItems );
router.get('/api/item/:item', shop.getItemById );
router.post('/api/items', auth, shop.postItem );
router.delete('/api/item/:item', auth, shop.deleteItem );
router.put('/api/item/:item', auth, shop.updateItem );
router.put('/api/item/:item/upvote', auth, shop.upvoteItem );

router.get('/api/items/:item/exercises', workoutplans.getExercises );
router.post('/api/workoutPlans/:id', workoutplans.createExercise );
router.get('/api/item/exercise/:exercise', workoutplans.getExercise );
router.post('/api/item/exercise/:exercise', workoutplans.newStep );
router.get('/api/item/step/:step', workoutplans.getStep );

router.post('/api/item/dietplan/:id/days', auth, dietplans.createDay );
router.put('/api/item/dietplan/:id/day/:order', auth, dietplans.updateDay );

router.get('/api/item/dietplan/recipe/:id', dietplans.getRecipe );
router.get('/api/item/dietplan/recipes/:query', dietplans.searchRecipes );
router.post('/api/item/dietplan/recipes', auth, dietplans.createRecipe );
router.put('/api/item/dietplan/recipe/:id', auth, dietplans.updateRecipe );

router.get('/api/item/dietplan/ingredients/:query', dietplans.searchIngredients );
router.post('/api/item/dietplan/ingredients', auth, dietplans.createIngredient );
router.put('/api/item/dietplan/ingredient/:id', auth, dietplans.updateIngredient );

router.get('/api/events', events.getEvents );
router.get('/api/event/:event', events.getEventById );
router.post('/api/events', auth, events.postEvent );
router.delete('/api/event/:event', auth, events.deleteEvent );
router.put('/api/event/:event', auth, events.updateEvent );
router.put('/api/event/:event/upvote', auth, events.upvoteEvent );
// router.put('/api/event/:event/review', auth, events.reviewEvent );

// Item page & transaction
router.post('/api/transactions', auth, transactions.createTransaction );
//transaction page & create customer
router.get('/api/transactions', transactions.getTransactions );
router.get('/api/transactions/:transaction', transactions.getTransactionById );

//customers
router.get('/api/customers', transactions.getCustomers );
router.get('/api/customers/:customer', transactions.getCustomerById );


// ------------------------------- GROUPS   ----------------------------------//
// # GROUP WALL PAGE
router.get('/api/groups', groups.getGroups );
router.post('/api/groups', groups.createGroup );
router.get('/api/group/:id', groups.getGroupById );
// router.param('/api/group', groups.getGroupByIdParam );

router.get('/api/group/:id/gposts', groups.getGposts );
router.post('/api/group/:id/gposts', groups.createGpost );

// router.param('/api/group/:id/gpost', groups.getGpostByIdParam );

// //post page & comments
// router.param('/api/gpost', groups.getGPostByIdParam );
// router.get('/api/gposts/:gpost', groups.getGPostById );
// router.put('/api/gposts/:gpost/upvote', auth, groups.upvoteGPost );
router.post('/api/gpost/:gpost/gcomments', groups.newGcomment );
// router.put('/api/gposts/:gpost/gcomments/:gcomment/upvote', auth, groups.upvoteGPostComment );
// router.param('gcomment', groups.getGPostCommentByIdParam );

// ----------------------- AUTHENTICATION   ----------------------------------//
router.post('/api/register', authentication.doRegistration );
router.post('/api/login', authentication.doLogin );
router.post('/api/forgot', authentication.recoverPassword );
router.put('/api/emailverify/:username/:user_token', authentication.verifyEmail );
router.get('/api/resetpassword/:username/:user_token', authentication.getResetPassword );
router.put('/api/resetpassword/:username/:user_token', authentication.doResetPassword );
//Facebook Integration
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback',  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/login' 
  }),
  function(req, res) {
    res.redirect('/');
  });
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// ----------------------- USER and SETTINGS  --------------------------------//
router.get('/api/languages', settings.getLanguages );
router.post('/api/user/:id/languages', settings.createLanguage );
router.get('/api/settings', settings.getSettings );
router.put('/api/settings', settings.updateSettings );

//s3
router.get('/api/user/:id/avatar', settings.signedRequestForAvatar );
router.put('/api/user/:id/avatar', auth, settings.updateAvatarSuccess );

//search
router.get('/api/search/:query', settings.submitSearch );

//get users
router.get('/api/users', settings.getUsers );
router.get('/api/users/:start/:end', settings.getUsersByPage );
router.get('/api/user/:id', settings.getUserById );
router.delete('/api/user/:id', auth, settings.deleteUser );
//for public profiles
router.get('/api/user/handle/:handle', settings.getUserByHandle );
router.post('/api/user/:handle/followers', settings.addFollower );



// ----------------------------- MESSAGING ----------------------------------//
router.get('/api/conversations', auth, messaging.getConversations );
router.get('/api/conversation/:id', messaging.getConversationById );

router.post('/api/conversation', auth, messaging.createConversation );
router.put('/api/conversation/:id/read', messaging.readMessages );
router.post('/api/conversation/:id/messages', auth, messaging.createMessage );


//------------------------------- MAP ----------------------------------------//


