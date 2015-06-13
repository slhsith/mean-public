/* -----------------------------------------------------
   Shop, Transactions
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');
var extend = require('util')._extend;
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];
var stripe = require('stripe')(config['STRIPE_SECRET_KEY']);


// --- Models --- //
var
  User          = mongoose.model('User'),

  Item          = mongoose.model('Item'),

  WorkoutPlan   = mongoose.model('WorkoutPlan'),
  Exercise      = mongoose.model('Exercise'),
  Step          = mongoose.model('Step'),

  DietPlan      = mongoose.model('DietPlan'),
  Day           = mongoose.model('Day'),
  Meal          = mongoose.model('Meal'),
  Recipe        = mongoose.model('Recipe'),
  CookingStep   = mongoose.model('CookingStep'),
  Ingredient    = mongoose.model('Ingredient'),

  Transaction   = mongoose.model('Transaction'),
  Customer      = mongoose.model('Customer');

var subItemInstantiation = {
  workoutplan: function(item) { return new WorkoutPlan(item); },
  dietplan   : function(item) { return new DietPlan(item); },
};
var subItemModel = {
  workoutplan: WorkoutPlan,
  dietplan: DietPlan,
};

// --- Exported Methods --- //

// ----------------------------- ITEMS --------------------------------- //
exports.getItems = function(req, res, next) {
  var query = {};
  if (req.query.creator) { query = {'creator._id': req.query.creator}; }
  if (req.query.type) { query = {'type': req.query.type}; }
  Item.find(query)
    .populate('exercise workoutplan dietplan')
    .exec(function(err, items){
      if(err){ return next(err); }
      return res.json(items);
   });
};


/* ---------- ITEM is a purchasable item in the system
---- Properties ----
 name: String
 upvotes: Number
 creator: { _id, username} from req.payload
 price: Number (dollar amount x 100 = cents)
 type: various subtypes | workoutplan, dietplan, video, book, podcast

---- Refs ----
 in the creator   &   <subtype> : subtype._id

 To create new item, must
    1) saveItem: Item.save
    2) updateUser: update User with item._id
 */
exports.postItem = function(req, res, next) {
  var item = new Item(req.body);
  item.creator = req.payload;
  item.save(function(err, item) {
    if (err) { return next(err); }
    User.findByIdAndUpdate(
      req.payload._id,
      { $push: { items: item._id } },
      { new: true },
      function(err, user) {
        if (err) { return next(err); }
          console.log('------>ITEM ', item.type, item._id);
          console.log('------>USER ITEMS ', user.items);
          return res.json(item);
    });
  })
};

// INTERNAL HELPER FUNCTIONS for POST ITEM
function _saveItem (item, callback) {
  item.save(function (err, item) {
    if (err) { return next(err); }
    console.log('------> item after saving', item);
    callback(null, item);
  });
}

/*   in the front end, our items are flattened with the format
 *   { _id       : item_id,
 *     <subtype> : subitem_id, ... }
 *
 *   We will want to update the subitem with the _id swapped to 
 *   { _id       : subitem_id, 
 *     item      : item_id, ... }                               */
exports.updateItem = function(req, res, next) {
  var type = req.body.type;
  var subitem_id = req.body[type];
  var model = subItemModel[type];

  Item.findByIdAndUpdate(
    req.body._id,
    req.body, 
    {new: true},
    function(err, item) {
      if (err) { return next(err); }
      return res.json(item);
  });
};

exports.getItemById = function (req, res, next) {
 var item_id = req.params.item;
 Item.findById(item_id)
 .populate('dietplan workoutplan')
 .exec(function(err, item) {
    if (err) { return next(err); }
    if (item) {
      return res.json(item);
    } else {
      return res.json({message: 'no item found'});
    }
 });
};

exports.upvoteItem = function(req, res, next) {
  Item.update(
    {_id: req.params.item},
    {$inc: {upvotes: 1}},
    function(err, item){
      if (err) { return next(err); }
      res.json(item);
  });
};

exports.deleteItem = function(req, res, next) {
  var item_id = req.params.item;
  Item.findByIdAndRemove(item_id, function (err, item) {
    if (err) { return next(err); }
    User.findByIdAndUpdate(
      req.params._id,
      { $pull: {items: {_id: item_id} }}, 
      function (err, items) {
        if(err){ return next(err); }
        console.log(items);
        res.json({message: 'Successfully deleted item ' + item_id, success: true});
    });    
  });
};
