/* -----------------------------------------------------
   Settings, User Profiles
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var 
  mongoose = require('mongoose');

// --- Models --- //
var
  Item          = mongoose.model('Item'),
  Language      = mongoose.model('Language'),
  Video         = mongoose.model('Video'),
  Book          = mongoose.model('Book'),
  Podcast       = mongoose.model('Podcast'),
  DietPlan      = mongoose.model('DietPlan'),
  Day           = mongoose.model('Day'),
  Bootcamp      = mongoose.model('Bootcamp'),
  Challenge     = mongoose.model('Challenge'),
  User          = mongoose.model('User'),
  Transaction   = mongoose.model('Transaction'),
  Customer      = mongoose.model('Customer');

// --- Exported Methods --- //


// ----------------------------- ITEMS --------------------------------- //
exports.getItems = function(req, res, next) {
   Item.find({}, function(err, items){
    if(err){ return next(err); }
      res.json(items);
  }).populate('days');
};

exports.postItem = function(req, res, next) {
  var item = new Item(req.body);
  console.log(item);
  item.author = req.payload.username;
  item.save(function(err, item){
    if (err) { return next(err); }
    User.findByIdAndUpdate(req.payload._id, { $push: { items: [item._id] }}, function (err, item) {
      if (err) {return next(err); }
      return item;
    });
  }).then(function () {
    if (req.body.type === 'Video'){
      var video = new Video(req.body);
      video.author = req.payload.username;
      video.item = [item._id]
      var user = function () {
        User.findById(req.payload._id), function (err, user) {
          if(err) { return next(err); }
          return user;
        };
      };
      video.save(function(err, video){
        if(err){ return next(err); }
        Item.findByIdAndUpdate(item._id, { $set: { video: [video._id], user: [req.payload._id] }}, function (err, item) {
          if (err) { return next(err); }
          return item;
        });
      });
    }
    if (req.body.type === 'Book'){
      var book = new Book(req.body);
      book.author = req.payload.username;
      book.item = [item._id]
      book.save(function(err, book){
        if(err){ return next(err); }
        Item.findByIdAndUpdate(item._id, { $set: { book: [book._id] }}, function (err, item) {
          if (err) { return next(err); }
          return item;
        });
      });
    }
    if (req.body.type === 'Podcast'){
      var podcast = new Podcast(req.body);
      podcast.author = req.payload.username;
      podcast.item = [item._id]
      podcast.save(function(err, podcast){
        if(err){ return next(err); }
        Item.findByIdAndUpdate(item._id, { $set: { podcast: [podcast._id] }}, function (err, item) {
          if (err) { return next(err); }
          return item;
          //random comment
        });
      });
    }
    if (req.body.type === 'DietPlan'){
      var dietPlan = new DietPlan(req.body);
      dietPlan.author = req.payload.username;
      dietPlan.item = [item._id];
      dietPlan.save(function(err, dietPlan){
        if(err){ return next(err); }
        Item.findByIdAndUpdate(item._id, { $set: { dietPlan: [dietPlan._id] }}, function (err, item) {
          if (err) { return next(err); }
          return item;
          //random comment
        });
        DietPlan.findByIdAndUpdate(dietPlan._id, { $set: { category: req.body.category }}, function  (err, dietPlan) {
          if (err) { return next(err); }
          return dietPlan;
        })
      });
    }
    if (req.body.type === 'Bootcamp'){
      var bootcamp = new Bootcamp(req.body);
      bootcamp.author = req.payload.username;
      bootcamp.item = [item._id];
      bootcamp.save(function(err, bootcamp){
        if(err){ return next(err); }
        Item.findByIdAndUpdate(item._id, { $set: { bootcamp: [bootcamp._id] }}, function (err, item) {
          if (err) { return next(err); }
          return item;
          //random comment
        });
      });
    }
  }) 
  .then(function() {
    res.json(item);
  });

};

exports.createDay = function(req, res, next) {
  DietPlan.findByIdAndUpdate(req.params.id, { $push: { days: [day.day] }}, function (err, dietPlan) {
    if (err) { return next(err); }
    return dietPlan;
    //random comment
  });
};

exports.getItemByIdParam = function(req, res, next, id) {
  var query = Item.findById(id);

  query.exec(function (err, item){
    if (err) { next(err); }
    if (!item) { next(new Error('can\'t find item')); }

    req.item = item;
    next();
  });
};

// this seems incomplete, the GET /:item  route
exports.getItemById = function(req, res, next) {
  Item.findById(req.params.item, function(err, item) {

  if(err) { return next(err); }
  return res.json(item);
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
