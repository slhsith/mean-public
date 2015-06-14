// ITEMS
app.factory('items', function($http, auth, $q){

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

  // SAVE / CREATE
  o.save = function(item) {

    var reservedFiles = [];

    if (!item._id) {
      item.creator = { _id: auth.isThisUser(), username: auth.getUser() };

      // send backend only metadata to generate AWS signed request URLs for uploading
      // files will be reserved for direct upload to AWS
      item.req_signed_req = _extractAll(item, reservedFiles);

      return $http.post('/api/items', item, auth.header()).then(_itemSuccessHandler)
      .then(function(item) {
        // if there were assets, item will include AWS signed req in payload
         return _uploadAll(item, reservedFiles);
      })
      .then(function(result) {
        console.log('after PUT success confirm', result);
        o.items.push(item);
      })
      .catch(_itemErrorHandler);
    } else {
      return $http.put('/api/item/' + item._id, item, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(_itemSuccessHandler).catch(_itemErrorHandler);
    }
  };

  function _extractAll (item, files) {
    var meta = [], asset = {}, copy = {};
    if (item.assets) {
      for (var key in item.assets) {
        if (item.assets.hasOwnProperty(key)) {
          asset = {role: key,
                   name: item.assets[key][0].name,
                   type: item.assets[key][0].type };
          angular.copy(asset, copy);
          copy.file = item.assets[key][0];
          meta.push(asset);
          files.push(copy);
          delete item.assets[key]; 
        }
      }
    }
    return meta;
  }

  function _uploadAll (item, files) {
    // returns the resolved array of promises to upload files to AWS
    // results are each processed into meta data only and PUT update to item assets
    return $q.all(

      item.signed_request_payload.map( function(req, i) {
        return $http.put(req.signed_request, files[i], {
            headers: { 
             'x-amz-acl'         : 'public-read', 
             'x-amz-meta-itemid' : item._id,
             'x-amz-meta-role'   : req.role,
             'Content-Type'      : req.type, }
        }).then(function(res) {
          var object = res.config.data;  // file that was uploaded
          object.ETag = res.headers().etag;
          object.item_id = item._id;
          delete object.file;
          console.log('asset object for our PUT then', object);
          return object;
        }); 
     }) 

    ).then(function(result) {
      if (result.length) {
        return $http.put('/api/item/' + item._id + '/assets', result, auth.header());
      } else {
        return {};
      }
    });
  }


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
