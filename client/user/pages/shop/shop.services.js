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
  o.create = function(item) {
    return $http.post('/api/items', item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(res.data, item);
      o.items.push(extendedItem);
      // will be added to the appropriate service object subarray
      // based on submitted type
      return res.data;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  // READ - basic getting of data
  o.getAll = function() {
    return $http.get('/api/items').then(function(res){
      angular.forEach(res.data, function(item) {
        item = _flattenItem(item);
      });
      angular.copy(res.data, o.items);
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.get = function(item_id) {
    return $http.get('/api/item/' + item_id).then(function(res){
      var item = _flattenItem(res.data);
      console.log(item);
      return item;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.getMine = function() {
    return $http.get('/api/items?creator=' + auth.isThisUser())
    .then(function(res) {
      angular.forEach(res.data, function(item) {
        item = _flattenItem(item);
      });
      return res.data;
    });
  };

  o.isMine = function(item) {
    return item.creator._id === auth.isThisUser();
  };

  // HELPER FUNCTION
  // the API gives us the whole subitem under the field of its name
  // like video: { duration: ... } so we want all the fields to be accessible
  // straight on the item, keeping the _id of the video in the video field
  function _flattenItem (item) {
    var subitem = item[item.type];
    for (var k in subitem) {
      if (subitem.hasOwnProperty(k) && subitem[k] !== subitem._id) {
        item[k] = subitem[k];
        item[item.type] = subitem._id;
      }
    }
    return item;
  }


  // UPDATE

  o.update = function(item) {
    return $http.put('/api/item/' + item._id, item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  o.upvote = function(item) {
    return $http.put('/api/item/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      item.upvotes += 1;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.addTransaction = function(id, transaction) {
    return $http.post('/api/item/' + id + '/transactions', transaction, {
      headers: {Authorization: 'Bearer '+transactions.getToken()}
    }).then(function(res){
      transactions.push(res.data);
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };




  // DELETE
  o.delete = function(item_id) {
    return $http.delete('/api/item/' + item_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      console.log('Successfully deleted item.');
      return res.data;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
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
  o.purchase = function(card) {
    console.log(card);
    return $http.post('/api/transactions', card, {
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
