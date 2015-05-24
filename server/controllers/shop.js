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

  Transaction   = mongoose.model('Transaction'),
  Customer      = mongoose.model('Customer');

// --- Exported Methods --- //


// ----------------------------- ITEMS --------------------------------- //
exports.getItems = function(req, res, next) {
   Item.find({}, function(err, items){
    if(err){ return next(err); }
      res.json(items);
  });
};

exports.postItem = function(req, res, next) {
  var item = new Item(req.body);
  console.log(item);
  item.author = req.payload.username;
  item.save(function(err, item){
  if (err) { return next(err); }
    // res.json(item);
  }).then(function () {
    if (req.body.type === 'Video'){
      var video = new Video(req.body);
      video.author = req.payload.username;
      video.item = [item._id]
      video.save(function(err, video){
        if(err){ return next(err); }
        Item.findByIdAndUpdate(item._id, { $set: { video: [video._id] }}, function (err, item) {
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
        Item.findByIdAndUpdate(item._id, { $set: { video: [book._id] }}, function (err, item) {
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
      dietPlan.item = [item._id]
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
  }) 
  .then(function() {
    res.json(item);
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
