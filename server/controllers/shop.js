/* -----------------------------------------------------
   Settings, User Profiles
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var 
  mongoose = require('mongoose');
var extend = require('util')._extend;
var stripe = require('stripe')('sk_test_I2YXlsuXk91TBDtJelFxcuEt');

// { foo: 'bar', another: 'attribute' }

// --- Models --- //
var
  User          = mongoose.model('User'),
  Language      = mongoose.model('Language'),

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

// --- Exported Methods --- //

// ----------------------------- ITEMS --------------------------------- //
exports.getItems = function(req, res, next) {
   Item.find({})
   .populate('exercise')
   .populate('workoutplan')
   .populate('dietplan')
   .populate('video')
   .populate('book')
   .populate('podcast')
   .exec(function(err, items){
      if(err){ return next(err); }
      return res.json(items);
   });
};


// exports.deleteItem = function(req, res, next, id) {
//   console.log(item);
//   Item.delete(item._id, function (err, item) {
//       if (err) { return next(err); }
//       // return this.findByIdAndRemove({ item_id: id });
//       // return item;
//     }).success(function(){
//       res.redirect('#/shop');
//     });
//   };
// //   Item.findOneAndRemove({ user : req.payload._id }, function (err, items) {
// //     if(err){ return next(err); }
// //     res.redirect('#/shop');
// //   });
// // };
exports.getExercises = function(req, res, next) {
  console.log(req.params._id);
  var _id = req.params._id;
  Exercise.findById(_id, function (err, exercise) {
    console.log(exercise);
    res.json(exercise);
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

function saveItem (item, callback) {
  item.save(function (err, item) {
    if (err) { return next(err); }
    console.log('------> item after saving', item);
    callback(null, item);
  });
}


function saveSubItem (err, item, subitem, callback) {
  subitem.item = item._id;
  subitem.save(function(err, subitem) {
    if(err){ return next(err); }
    callback(null, item, subitem);
  });
}

function updateItem (err, item, subitem, callback) {
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

exports.postItem = function(req, res, next) {
  var item = new Item(req.body);
      item.creator = req.payload;
  var subitem = subItemInstantiation[item.type](req.body);
  var user = { _id: req.payload._id };
  saveItem(item, function(err, item) {
    saveSubItem(err, item, subitem, function(err, item, subitem) {
      updateItem(err, item, subitem, function(err, item, subitem) {
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

exports.createExercise = function (req, res, next) {
 var exercise = new Exercise(req.body);
 item_id = req.params.item;
 exercise.save(function(err, exercise) {
    if (err) { return next(err); }
    Item.findByIdAndUpdate(item_id, { $push: { exercises: exercise._id } }).exec(function(err, item) {
      if(err){ return next(err); }
      res.json(item);
    });
  });
};

exports.newStep = function (req, res, next) {
 var step = new Step(req.body);
 exercise_id = req.body.exercise;
 step.save(function(err, step) {
    if (err) { return next(err); }
    Exercise.findByIdAndUpdate(exercise_id, { $push: { steps: step._id } }).exec(function(err, exercise) {
      if(err){ return next(err); }
      res.json(exercise);
    });
  });
};

// PUT FOR DIET PLAN 
// ---> PUT /api/item/item_id/diet
// MIGHT BE INTERNAL FUNCTION FOR EACH ITEM TYPE AND THEN WE WILL SWITCH ON SAME API
// ---> PUT /api/item/item_id
exports.updateDietPlan = function(req, res, next) {
  // front end sees items with _id: item_id 
  // and <Subitem>: subitem_id, swap for PUT 
  swapIds(req.body);
  // var  item_id  = req.body._id,
    // subitem_id  = req.body[req.body.type];
  // req.body._id  = subitem_id; // make sure what we post gets diet_id as _id
  // req.body.item = item_id;    // item gets item_id
  console.log('----> updating', req.body);

  DietPlan.findByIdAndUpdate(subitem_id, req.body, { new : true }, function(err, dietplan) {
    if (err) { return next(err); }
    return res.json(dietplan);//{'message': 'Successfully saved changes to diet plan.'});
  });
};


exports.createRecipe = function (req, res, next) {
 var recipe = new Recipe(req.body);
 recipe.save(function(err, recipe) {
    if (err) { return next(err); }
    return res.json(recipe);
 });
};

exports.createIngredient = function(req, res, next) {
  var ingredient = new Ingredient(req.body);
  ingredient.save(function(err, ingredient) {
    if (err) { return next(err); }
    return res.json(ingredient);
 });
};

exports.searchRecipes = function(req, res, next) {
  var re = new RegExp(req.params.query, 'i');
  Recipe.find({name: { $regex: re }})
    .limit(25)
    .exec(function(err,recipes) {
      if (err) { return next(err); }
      console.log(recipes);
      return res.json(recipes); 
  });

};

exports.searchIngredients = function(req, res, next) {
  var re = new RegExp(req.params.query, 'i');
  Ingredient.find()
    .or( [{name: { $regex: re }}, {category: {$regex: re}}, {keywords: {$regex: re}}] )
    .limit(25)
    .exec(function(err,ingredients) {
      if (err) { return next(err); }
      console.log(ingredients);
      return res.json(ingredients); 
  });

};


exports.getItemById = function (req, res, next) {
 var item_id = req.params.id;
 Item.findById(item_id)
 .populate('dietplan')
 .populate('workoutplan')
 .populate('video')
 .populate('book')
 .populate('podcast')
 .exec(function(err, item) {
    if (err) { return next(err); }
    console.log('----> populated\n', item);
    return res.json(item);
 });
};

exports.getDietPlanById = function(req, res, next) {
  console.log(req.params);
  DietPlan.findById(req.params.dietplanid, function(err, dietPlan) {
    console.log('------>DIETPLAN', dietPlan);
    if (err) { return next(err); }
    return res.json(dietPlan);
  });
};

exports.getExercise = function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.exercise;
 Exercise.findById(_id, function(err, exercise, steps) {
  console.log(exercise);
  res.json(exercise);
 }).populate('steps');
};

exports.getStep = function (req, res, next) {
 var _id = req.params.step;
 Step.findById(_id, function(err, step) {
  console.log(step);
  res.json(step);
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




//   Bootcamp: function(err, item) {
//     var bootcamp = new Bootcamp(item);
//     bootcamp.item = [item._id];
//     bootcamp.save(function (err, bootcamp) {
//       if(err){ return next(err); }
//       return bootcamp;
//     });
//   },
//   Challenge: function(err, item) {
//     var challenge = new Challenge(item);
//     challenge.item = [item._id];
//     challenge.save(function (err, challenge) {
//       if(err){ return next(err); }
//       return challenge;
//     });
//   },
// };
  // bootcamp: function(event) {
  //   return new Bootcamp(event);
  // }
