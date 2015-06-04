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
var stripe = require('stripe')('sk_test_z1OaqEIX71PB6nqiDgZ8bfLE');

// API controllers 
// the Models are referenced in those files so we don't need to declare our models here
// i.e. you can skip this ... Language      = mongoose.model('Language'),
var 
  authentication  = require('../controllers/authentication'),
  posts           = require('../controllers/posts'),
  groups          = require('../controllers/groups'),
  shop            = require('../controllers/shop'),
  settings        = require('../controllers/settings'),
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
router.post('/api/items', auth, shop.postItem );
// router.param('/api/item', shop.getItemByIdParam );
router.get('/api/item/:id', shop.getItemById );
router.put('/api/items/:item/upvote', auth, shop.upvoteItem );

router.get('/api/items/:item/exercises', shop.getExercises );
router.post('/api/workoutPlans/:id', shop.createExercise );
router.get('/api/item/exercise/:exercise', shop.getExercise );
router.post('/api/item/exercise/:exercise', shop.newStep );
router.get('/api/item/step/:step', shop.getStep );

router.get('/api/item/dietplan/:dietplanid', auth, shop.getDietPlanById );
router.put('/api/item/dietplan/:dietplanid', auth, shop.updateDietPlan );
router.post('/api/item/dietplans/recipes', auth, shop.createRecipe );
router.post('/api/item/dietplans/ingredients', auth, shop.createIngredient );
router.get('/api/item/dietplans/recipes/:query', auth, shop.searchRecipes );
router.get('/api/item/dietplans/ingredients/:query', auth, shop.searchIngredients );

// Item page & transaction
router.post('/api/transactions', auth, shop.createTransaction );
//transaction page & create customer
router.get('/api/transactions', shop.getTransactions );
router.get('/api/transactions/:transaction', shop.getTransactionById );
router.post('/api/transaction/:transaction/customers', auth, shop.createCustomerOnTransaction );

//customers
router.get('/api/customers', shop.getCustomers );
router.get('/api/customers/:customer', shop.getCustomerById );


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
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/user/#/home', failureRedirect: '/#/' })
  // function(req, res) {
  //   successRedirect: '/'
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
);


// ----------------------- USER and SETTINGS  --------------------------------//
router.get('/api/languages', settings.getLanguages );
router.post('/api/user/:id/languages', settings.createLanguage );
router.get('/api/settings', settings.getSettings );
router.put('/api/settings', settings.updateSettings );

//search
router.get('/api/search/:query', settings.submitSearch );

//get users
router.get('/api/users', settings.getUsers );
router.get('/api/users/:start/:end', settings.getUsersByPage );
router.get('/api/user/:id', settings.getUserById );
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


