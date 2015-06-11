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
    if (!item._id) {
      return $http.post('/api/items', item, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(_itemSuccessHandler).catch(_itemErrorHandler);
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
    .then(_itemSuccessHandler)
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
