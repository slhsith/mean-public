// ITEMS
app.factory('items', function($http, auth){

  var o = {
    items: []
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
      return data;
    });
  };

  // READ - basic getting of data
  o.getAll = function() {
    return $http.get('/api/items').success(function(data){
      angular.forEach(data, function(item) {
        item = flattenItem(item);
      });
      angular.copy(data, o.items);
    });
  };

  o.get = function(item_id) {
    return $http.get('/api/item/' + item_id).success(function(data){
      return flattenItem(data);
    });
  };

// HELPER FUNCTION
// the API gives us the whole subitem under the field of its name
// like video: { duration: ... } so we want all the fields to be accessible
// straight on the item, keeping the _id of the video in the video field
  function flattenItem (item) {
    var subitem = item[item.type];
    for (var k in subitem) {
      if (subitem.hasOwnProperty(k) && subitem[k] !== subitem._id) {
        item[k] = subitem[k];
        item[item.type] = subitem._id;
      }
    }
  }

  o.delete = function(item_id) {
    return $http.delete('/api/item/' + item_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.getAllVideos = function () {
    return $http.get('/api/videos').success(function(data){
      angular.copy(data, o.videos);
    });
  };

  // UPDATE

  // API hits specific to item type
  o.update = function(item) {
    // e.g. PUT diet @ /api/item/dietplan/dietplan_id, 
    return $http.put('/api/item/' + item._id, item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  o.upvote = function(item) {
    return $http.put('/api/items/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      item.upvotes += 1;
    });
  };

  o.addTransaction = function(id, transaction) {
    return $http.post('/api/items/' + id + '/transactions', transaction, {
      headers: {Authorization: 'Bearer '+transactions.getToken()}
    }).success(function(data){
      transactions.push(data);
    });
  };

  o.newPlan = function (plan, id) {
    return $http.post('/api/workoutPlans/' + id, plan, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, plan);
      o.items.push(extendedItem);
    });
  };
  o.newStep = function (step, id) {
    return $http.post('/api/item/exercise/' + id, step, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, step);
      o.items.push(extendedItem);
    });
  };
  o.getExercise = function(exercise) {
    console.log(exercise);
    return $http.get('/api/item/exercise/' + exercise).then(function(res){
      return res.data;
    });
  };
  o.getExercises = function(id) {
    return $http.get('/api/items/' + id + '/exercises').success(function(data){
      console.log(data);
      angular.copy(data, o.items);
    });
  };
  o.getStep = function(step) {
    console.log(step);
    return $http.get('/api/item/step/' + step).then(function(res){
      return res.data;
    });
  };

  o.updateDietplan = function(item, object) {
    var dietplan_id = item.dietplan;
    var current_days_set = item.days_set;

    var dietplanAPI = '/api/item/dietplan/' + dietplan_id + '/';

    // saving the whole day, 
    // basically a meal was added or changed
    if (object.order) {
      // this is a new day beyond those set before
      if (current_days_set < object.order) {
        object.days_set = current_days_set;
        return $http.post(dietplanAPI + 'days', object, {
          headers: {Authorization: 'Bearer '+auth.getToken()}
        });
      }
      // this is an update of a previously set day
      return $http.put(dietplanAPI + 'days', object, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    }


  };


  // DELETE
  //  ...

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
