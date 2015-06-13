// ITEMS
app.factory('items', function($http, auth){

  var o = {
    items: [],
    item: {}
  };

  o.titles = {
    workoutplan : 'Workout Plan',
    dietplan    : 'Diet Plan',
    book        : 'Book',
    podcast     : 'Podcast',
    video       : 'Video'
  };



  // CREATE
  o.save = function(item) {

    var reservedAssets = [];

    if (!item._id) {
      // remove files from the item object, set aside
      // send backend the metadata
      // so we can generate AWS signed request URLs for uploading
      item.req_signed_req = _extractAssets(item, reservedAssets);
      console.log('attached signed request request', item.req_signed_req);
      return $http.post('/api/items', item, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      })
      .then(_itemSuccessHandler)
      .then(_uploadAssets(item, reservedAssets))
      .then(_updateItemAssets)
      .then(function(item) {
        o.items.push(item);
      })
      .catch(_itemErrorHandler);
    } else {
      return $http.put('/api/item/' + item._id, item, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(_itemSuccessHandler).catch(_itemErrorHandler);
    }
  };

  // READ - basic getting of data
  o.getAll = function(type) {
    // query string if we got a type, else blank
    var queryString = type? '?type=' + type : '';
    return $http.get('/api/items' + queryString)
    .then(_itemsSuccessHandler)
    .catch(_itemErrorHandler);
  };

  o.get = function(item_id) {
    return $http.get('/api/item/' + item_id)
    .then(_itemSuccessHandler)
    .catch(_itemErrorHandler);
  };

  o.getMine = function() {
    return $http.get('/api/items?creator=' + auth.isThisUser())
    .then(_itemsSuccessHandler)
    .catch(_itemErrorHandler);
  };

  // UPDATE
  o.update = function(item) {
    return $http.put('/api/item/' + item._id, item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(_itemSuccessHandler)
    .catch(_itemErrorHandler);
  };

  o.upvote = function(item) {
    return $http.put('/api/item/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      item.upvotes += 1;
    }).catch(_itemErrorHandler);
  };


  // helper function to extract assets from scope.item object
  function _extractAssets (item, reservedFiles) {
    console.log('assets', item.assets);
    var assets = item.assets, 
        payload_to_aws = [], asset = {}, reservedCopy = {};
    if (assets) {
      for (var key in assets) {
        if (assets.hasOwnProperty(key)) {
          asset.role = key;
          asset.name = assets[key][0].name;
          asset.type = assets[key][0].type;
          console.log('asset to request a signed reqest for', asset);
          payload_to_aws.push(asset);
          angular.copy(asset, reservedCopy);
          console.log(reservedCopy);
          reservedCopy.file = assets[key][0];
          reservedFiles.push(reservedCopy);
          delete assets[key];
        }
      }
    }
    console.log('reservedFiles', reservedFiles);
    return payload_to_aws;
  }

// should really Q.all this set of promises or something
  function _uploadAssets (item, assets) {
    var requests = item.signed_request_payload;
    angular.forEach(requests, function(req, i) {
      $http.put(req, assets[i], {
        headers: { 
         'x-amz-acl': 'public-read', 
         'x-amz-meta-itemid': item._id,
         'x-amz-meta-role': assets[i].role,
         'Content-Type': assets[i].type,
        }
      }).then(function(data) {
        // update the item.assets as appropriate and prepare for
        // sending confirmation to backend
      });
    });
  }

  function _updateItemAssets (item) {
  //   .then(function(res){
  //     console.log('amazon putObject result', res);
  //     var req = {
  //       filename: user.avatar.name, 
  //       headers: res.headers()
  //     };
  //     return $http.put('/api/user/' + user._id + '/avatar', req, {
  //       headers: { 'Authorization': 'Bearer '+auth.getToken() }
  //     }); 

  }

  // DELETE
  o.delete = function(item_id) {
    return $http.delete('/api/item/' + item_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      console.log('Successfully deleted item.');
      return res.data;
    }).catch(_itemErrorHandler);
  };

  // INTERNAL HELPER FUNCTIONS

  // -- result handlers --
  // plural
  var _itemsSuccessHandler = function(res) {
    angular.copy(res.data, o.items);
    return res.data;
  };

  // singular
  var _itemSuccessHandler = function(res) {
    o.item = res.data;
    return res.data;
  };

  var _itemErrorHandler = function(err) {
    console.log('failure');
    return err;
  };


  return o;
  

}); // </END OF ITEMS FACTORY>



// TRANSACTIONS
app.factory('transactions', ['$http', 'auth', function($http, auth){
  var o = {
    transactions: []
  };  
  // o.getAll = function() {
  //   return $http.get('/api/transactions').success(function(data){
  //     angular.copy(data, o.transactions);
  //   });
  // };
  o.get = function(id) {
    return $http.get('/api/transactions/' + id).then(function(res){
      return res.data;
    });
  };

  o.addTransaction = function(id, transaction) {
    return $http.post('/api/item/' + id + '/transactions', transaction, {
      headers: {Authorization: 'Bearer '+transactions.getToken()}
    }).then(function(res){
      o.transactions.push(res.data);
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.purchase = function(transaction) {
    // $scope.item with card info attached
    console.log(transaction);
    return $http.post('/api/transactions', transaction, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      console.log(data);
    });
  };
  return o;
}]);




// CUSTOMERS
app.factory('customers', ['$http', 'auth', function($http, auth){
  var o = {
    customers: []
  };  
  o.get = function(id) {
    return $http.get('/api/customers/' + id).then(function(res){
      return res.data;
    });
  };
  return o;
}]);  




/// CONSTRUCTOR OF NEW ITEMS
app.factory('Item', function() {

  var ItemConstructor = function ItemConstructor (type) {
    this.name         = null;
    this.creator      = { username: null, _id: null };

    this.price        = null;
    this.upvotes      = null;

    this.type         = type || null;
  };

  return ItemConstructor;

});
