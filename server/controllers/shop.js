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
          Metadata: { 'itemid': item._id, role: asset.role }
        };
        console.log('__________>', s3_params, '\n\n');

        s3.getSignedUrl('putObject', s3_params, function(err, data){
          // if(err){ return next(err); }
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



// //assets for items
exports.signedRequestForAssets = function (req, res, next) {
  console.log('sign request for', req.query);
  var asset = req.query;

  var s3_params = {
    Bucket: S3_BUCKET,
    Key: 'images/items/temp/' + asset.name,
    Expires: 120,
    ContentType: asset.type,
    ACL: 'public-read',
    Metadata: { 'userid': req.params.id, role: 'item_asset' }
  };
  s3.getSignedUrl('putObject', s3_params, function(err, data){
    if(err){ return next(err); }
    console.log(data);

    var return_data = {
      signed_request: data,
      url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+asset.name
    };
    res.json(return_data);
  });
};

exports.updateAssetSuccess = function(req, res, next) {
  console.log('successful upload for ' + req.payload.f_name + ' ' + req.body._id, req.body.filename, req.body.headers);
  var new_asset_filename = req.body.filename;

  // need to rename file in aws
  // need to update item object in mongo
  // respond with ultimate URL so we can preview it over in front end
  var extension = '.' + new_asset_filename.split('.').pop();
  new_asset_filename = req.payload.l_name + '_' + req.payload.f_name +
   '_' + req.params.id + '_' + new Date().getTime() + extension;
  console.log('avatar to change to key', new_avatar_name);
  var s3_params = {
    Bucket: S3_BUCKET,
    CopySource: S3_BUCKET + '/images/avatar/temp/' + req.body.filename,
    Key: 'images/avatar/' + new_avatar_name,
    ACL: 'public-read'
    // MetadataDirective: 'COPY'
  };
  s3.copyObject(s3_params, function(err, data){
    if(err){ return next(err); }
    console.log('copyObject data result', data); // data.CopyObjectResult.ETag to be compared
    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/images/avatar/'+new_avatar_name;
    if (data.ETag === req.body.headers.etag) {
      console.log('matching ETags!');
      s3.deleteObject({
        Bucket: S3_BUCKET,
        Key: '/images/avatar/temp/' + req.body.filename 
      }, function(err, data) {
          console.log('S3 delete of ' + req.body.filename, data);
      });

      User.findByIdAndUpdate(req.params.id, 
        {$set: {avatar_url: url} }, 
        {new: true}, 
        function(err, user) {
          if (err) return next(err);
          res.json(user);
      });
    }
  });
};
