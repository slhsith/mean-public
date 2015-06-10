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

  Video         = mongoose.model('Video'),
  Book          = mongoose.model('Book'),
  Podcast       = mongoose.model('Podcast'),

  Bootcamp      = mongoose.model('Bootcamp'),
  Challenge     = mongoose.model('Challenge'),

  Transaction   = mongoose.model('Transaction'),
  Customer      = mongoose.model('Customer');

var subItemInstantiation = {
  workoutplan: function(item) { return new WorkoutPlan(item); },
  dietplan   : function(item) { return new DietPlan(item); },
  video      : function(item) { return new Video(item); },
  book       : function(item) { return new Book(item); },
  podcast    : function(item) { return new Podcast(item); }
};
var subItemModel = {
  workoutplan: WorkoutPlan,
  dietplan: DietPlan,
  video: Video,
  book: Book,
  podcast: Podcast
};
var types = ['workoutplan', 'dietplan', 'video', 'book', 'podcast'];

// --- Exported Methods --- //

// ----------------------------- ITEMS --------------------------------- //
exports.getItems = function(req, res, next) {
   Item.find({})
   .populate('exercise workoutplan dietplan video book podcast')
   .exec(function(err, items){
      if(err){ return next(err); }
      var result = [];
      items.forEach(function(item) {
        result.push(removeNullSubtypeFields(item));
      });
      return res.json(result);
   });
};
exports.deleteItem = function(req, res, next) {
  var item_id = req.params.item;
  Item.findByIdAndRemove(item_id, function (err, item) {
    if (err) { return next(err); }
    User.findByIdAndUpdate(item_id,
      { $pull: {items: {_id: item_id} }}, 
      function (err, items) {
        if(err){ return next(err); }
        console.log(items);
        res.json({message: 'Successfully deleted item ' + item_id, success: true});
    });    
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
    2) saveSubItem: SubType.save with item._id reference included
    3) updateItem: update Item with refence to SubType
    4) updateUser: update User with item._id
 */
exports.postItem = function(req, res, next) {
  var item = new Item(req.body);
      item.creator = req.payload;
  var subitem = subItemInstantiation[item.type](req.body);
  var user = { _id: req.payload._id };
  _saveItem(item, function(err, item) {
    _saveSubItem(err, item, subitem, function(err, item, subitem) {
      _updateItemWithSubitemId(err, item, subitem, function(err, item, subitem) {
        User.findByIdAndUpdate(
          req.payload._id,
          { $push: { items: item._id } },
          { new: true },
          function(err, user) {
            if (err) { return next(err); }
            console.log('------>ITEM ', item.type, item._id);
            console.log('------>USER ITEMS ', user.items);
            item[item.type] = subitem._id;
            console.log('------>RESULT', item);
            return res.json(item);
          }
        );
      });
    });
  });
};
// INTERNAL HELPER FUNCTIONS for POST ITEM
function _saveItem (item, callback) {
  item.save(function (err, item) {
    if (err) { return next(err); }
    console.log('------> item after saving', item);
    callback(null, item);
  });
}
function _saveSubItem (err, item, subitem, callback) {
  subitem.item = item._id;
  subitem.save(function(err, subitem) {
    if(err){ return next(err); }
    callback(null, item, subitem);
  });
}
function _updateItemWithSubitemId (err, item, subitem, callback) {
  // this will be the update needed, matching the type of the item
  // e.g. { $set : { 'video' : video._id }} 
  var update = {};
  update[item.type] = subitem._id;
  Item.findByIdAndUpdate(
    item._id, 
    { $set : update },
    { new: true},
    function(err, item) {
      if (err) { return next(err); }
      callback(null, item, subitem);
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

  // might need to update price/name in Item object??
  // Item.findByIdAndUpdate(
    // req.body._id,
    // req.body, 
    // function(err, item) {
      // if (err) { return next(err); }
      swapIds(req.body);
      model.findByIdAndUpdate(
        subitem_id,
        req.body,
        {new: true},
        function(err, subitem) {
          if (err) { return next(err); }
          return res.json(subitem);
      });
    // }
  // );
};

exports.getItemById = function (req, res, next) {
 var item_id = req.params.item;
 Item.findById(item_id)
 .populate('dietplan workoutplan video book podcast')
 .exec(function(err, item) {
    if (err) { return next(err); }
    console.log('----> populated\n', item);
    if (item) {
      return res.json(removeNullSubtypeFields(item));
    } else {
      return res.json({message: 'no item found'});
    }
 });
};

// also seems incomplete, to be implemented
exports.upvoteItem = function(req, res, next) {
  req.item.upvote(function(err, item){
    if (err) { return next(err); }

    res.json(item);
  });
};




// ----------------------------- TRANSACTIONS ------------------------------- //

// Item page & transaction
exports.createTransaction = function(req, res, next) {
  console.log(req.payload.stripe_id);
  var source =  { object: 'card', number: req.body.number, exp_month: req.body.month, exp_year: req.body.year, cvc: req.body.cvc, name: req.body.cardholder_name };
  stripe.customers.createSource(req.payload.stripe_id,
    { source: source },
    function(err, card) {
      if(err) {return next(err); }
      User.findByIdAndUpdate(req.payload._id, { $addToSet: { stripe_card: card } }, function(err, user) {
        if(err){ return next(err); }
        console.log('Success! Saved card');
      });
      stripe.charges.create({
        amount: req.body.price,
        currency: "usd", //to be changed
        source: source
      }, function(err, charge) {
        if(err){ return  next(err); }
        if(charge.paid){
          User.findByIdAndUpdate(req.payload._id, { $addToSet: { purchases: req.body._id } }, function(err, user) {
            if(err) { return next(err); }
            console.log('Success! Saved item to user');
          });
        }
      });
      res.json(card);
    });
};

//transaction page & create customer
exports.getTransactions = function(req, res, next) {
  Transaction.find({}, function(err, transactions){
    if(err){ return next(err); }

    res.json(transactions);
  });
};

exports.getTransactionById = function(req, res, next) {
  var id = req.params.transaction;
  // to be completed
  // Transaction,findById(id, ...)
};





// ----------------------------- CUSTOMERS  --------------------------------- //

// for route: router.post('/api/transaction/:transaction/customers'
exports.createCustomerOnTransaction = function(req, res, next) {
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
};



exports.getCustomers = function(req, res, next) {
  Customer.find({}, function(err, customers){
    if(err){ return next(err); }

    res.json(customers);
  });
};

exports.getCustomerById = function(req, res, next) {
  var id = req.params.customoer;
  // to be completed
  // Customer.findById(id, ...)
};



// ---------------  HELPER FUNCTIONS ------------------- //
function swapIds (item) {
  // this is an Item, and we want Ids in <Subitem> format
  if (!item.item) {
    var  item_id  = item._id,
      subitem_id  = item[item.type];
        item._id  = subitem_id; // make sure what we post gets diet_id as _id
        item.item = item_id;    // item gets item_id
  } else {
    var subitem_id = item._id,
           item_id = item.item;
          item._id = item_id;    // make sure what we post gets item_id as _id
   item[item.type] = subitem_id; // item.Subitem gets subitem_id
  }
}

function removeNullSubtypeFields(item) {
  item = item.toObject();
  types.forEach(function(type) {
    if (item[type] === null) {
      delete item[type];
    }
  });
  return item;
}

