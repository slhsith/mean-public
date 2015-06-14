/* -----------------------------------------------------
   Shop, Transactions
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');
var extend = require('util')._extend;
var Q = require('q');
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];
var stripe = require('stripe')(config['STRIPE_SECRET_KEY']);
var aws = require('aws-sdk');
var AWS_ACCESS_KEY = config['AWS_ACCESS_KEY'];
var AWS_SECRET_KEY = config['AWS_SECRET_KEY'];
var S3_BUCKET = config['S3_BUCKET'];
aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
var s3 = new aws.S3();


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
    // .populate('exercise workoutplan dietplan')
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
    2) maybe some assets to save to AWS??
    2) updateUser: update User with item._id
 */
exports.postItem = function(req, res, next) {
  console.log(req.body);
  var item = new Item(req.body);
  item.creator = req.payload;
  var assets = req.body.req_signed_req;
  var aws_promises = [];

  item.save(function(err, item) {
    if (err) { return next(err); }
    User.update({_id: req.payload._id},
      { $push: { items: item._id } },
      function(err, user) {
        if (err) { return next(err); }
    });

    if (assets) {
      console.log('---assets to upload to aws---\n', assets);
      // prepare to push on results of aws promises
      item = item.toObject();
      item.signed_request_payload = [];

      assets.forEach(function(asset) {
        var s3_params = {
          Bucket: S3_BUCKET,
          Key: 'items/assets/temp/' + item._id + '/' + asset.name,
          Expires: 120,
          ContentType: asset.type,
          ACL: 'public-read',
          Metadata: { 'itemid': item._id.toString(), role: asset.role }
        };
        console.log('__________>', s3_params, '\n\n');

        // need to Q array this to make sure to return on Q.all
        s3.getSignedUrl('putObject', s3_params, function(err, data){
          if(err){ return next(err); }
          console.log('asset ' + asset.role + ' ' + asset.name + '\n', data);
          asset.signed_request = data;
          asset.url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/items/assets/temp/' + item._id + "/" + asset.name
          item.signed_request_payload.push(asset);
          console.log('to res', item);
        });
      });
      res.json(item);

    } else { //#### END PROCESSING ASSETS
      res.json(item); // return without any assets
    }

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
    User.update(
      {_id: req.params._id},
      { $pull: {items: {_id: item_id} }}, 
      function (err, user) {
        if(err){ return next(err); }
        console.log('item delete from ', user);
        res.json({message: 'Successfully deleted item ' + item_id, success: true});
    });    
  });
};


// successful file uploads ?action="confirmfile" ?
// maybe for new file uploads if we use query params ?action="newfile"
exports.updateItemAssets = function(req, res, next) {
  var awsUploads = req.body; // array of asset objects with Etags
  var item = {_id: req.params.item};
  var updates = {};
  console.log(awsUploads.length + ' successful upload(s) for item ' + item._id);
  console.log(awsUploads);

  var promises = [];
  var base_url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/';
  awsUploads.forEach(function(asset) {
    asset.key = 'items/assets/'+item._id+'/item_' + asset.role + '_' 
                + new Date().getTime() + '.' + asset.name.split('.').pop();
    asset.url = base_url + asset.key;
    promises.push(_copyFile(asset));
  });

  Q.allSettled(promises).done(function(results) {
    console.log('q all result', results);
    results.forEach(function(result, i) {
      console.log('index', i);
      if (result.state === 'fulfilled') {
        console.log('result after copy file\n', result, awsUploads[i]);
        if (awsUploads[i].role === 'photos') {
          updates.$push.assets.photos = awsUploads[i].url;
        } else if (awsUploads[i].role === 'videos') {
          updates.$push.assets.videos = awsUploads[i].url;
        } else {
          var key = 'assets.' + awsUploads[i].role;
          var update = {}; update[key] = awsUploads[i].url;
          updates.$set = update;
        }
      }
    });
    console.log('updates', updates);

    Item.findByIdAndUpdate(
      item._id, 
      updates, 
      {new: true}, 
      function(err, item) {
      if (err) return next(err);
        console.log('item after asset urls');
        res.json(item);
    });
  });
};

function _copyFile(asset) {
  console.log('===> move copy of asset', asset);
  var s3_params = {
    Bucket: S3_BUCKET,
    CopySource: S3_BUCKET + '/items/assets/temp/' + asset.item_id + '/' + asset.name,
    Key: asset.key,
    ACL: 'public-read'
  };
  console.log('s3_params', s3_params);
  // return the promise
  return Q.nbind( s3.copyObject(s3_params) );
}
