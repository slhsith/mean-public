app.factory('posts', ['$http', 'auth', function($http, auth){
  var o = {
    posts: [],
    post: {}
  };

  o.getAll = function() {
    return $http.get('/api/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  o.create = function(post) {
    return $http.post('/api/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.posts.push(data);
    });

  };
  o.upvote = function(post) {
    return $http.put('/api/posts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      post.upvotes += 1;
    });
  };
  o.get = function(id) {
    return $http.get('/api/posts/' + id).then(function(res){
      return res.data;
    });
  };
  o.addComment = function(id, comment) {
    return $http.post('/api/posts/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.upvoteComment = function(post, comment) {
    return $http.put('/api/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes += 1;
    });
  };
  return o;
}]);


app.factory('comments', ['$http', 'auth', function($http, auth){
  var o = {
    comments: []
  };
  o.getAll = function() {
    return $http.get('/api/comments').success(function(data){
      angular.copy(data, o.comments);
    });
  };
  return o;
}]);  


app.factory('items', ['$http', 'auth', function($http, auth){
  var o = {
    items: [],
    item: {}
  };


  o.getAll = function() {
    return $http.get('/api/items').success(function(data){
      angular.copy(data, o.items);
    });
  };
  o.create = function(item) {
    return $http.post('/api/items', item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.items.push(data);
    });
  };
  o.get = function(id) {
    return $http.get('/api/items/' + id).then(function(res){
      return res.data;
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
  return o;
  
  // var t = function(){
  //   console.log(item.name);
  // };


  // t();
}]);

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
  o.addCustomer = function(id, customer) {
    return $http.post('api/transactions' + id + '/customers', customer, {
      headers: {Authorization: 'Bearer '+transactions.getToken()}
    }).success(function(data){
      transactions.push(data);
    });
  };
  return o;
}]);

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


app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};
   auth.saveToken = function (token){
      $window.localStorage['admin-token'] = token;
    };

    auth.getToken = function (){
      return $window.localStorage['admin-token'];
    };
    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };
    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };
    auth.logOut = function(){
      $window.localStorage.removeItem('admin-token');
      $window.location = "http://localhost:3000";
    };
  return auth;
}]);

app.factory('languages', ['$http', '$window', function($http, $window){
    var o ={
      languages:[]
    };
    o.test = function (language) {
      console.log(language);
    };
    o.getLangs = function (language) {
      return $http.get('/api/settings/lanuages').success(function(data){
        angular.copy(data, o.items);
      });
    };
    o.addLang = function(language){
      return $http.post('/api/settings/languages').success(function(data){
        o.languages.push(data);
      });
    };
  return o;
}]);
app.factory('settings', ['$http', '$window', function($http, $window){
    var o ={
      settings:[]
    };
    o.test = function (setting) {
      console.log(setting);
    };
    o.getSettings = function () {
      return $http.get('/api/settings/', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
        angular.copy(data, o.items);
      });
    };
    o.update = function(){
      return $http.put('/api/settings/').success(function(data){
        o.settings.push(data);
      });
    };
  return o;
}]);

app.factory('groups', ['$http', 'auth', function($http, auth){
  var o = {
    groups: [],
    group: {}
  };

  o.getAll = function() {
    return $http.get('/api/groups').success(function(data){
      angular.copy(data, o.groups);
    });
  };
  o.create = function(group) {
    return $http.post('/api/groups', group, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.groups.push(data);
    });

  };
  o.get = function(id) {
    return $http.get('/api/groups/' + id).then(function(res){
      return res.data;
    });
  };
  return o;
}]);

app.factory('gposts', ['$http', 'auth', function($http, auth){
  var o = {
    gposts: [],
    gpost: {}
  };

  o.getAll = function() {
    return $http.get('/api/gposts').success(function(data){
      angular.copy(data, o.gposts);
    });
  };
  o.create = function(gpost) {
    return $http.post('/api/gposts', gpost, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.gposts.push(data);
    });

  };
  o.upvote = function(gpost) {
    return $http.put('/api/gposts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      gpost.upvotes += 1;
    });
  };
  o.get = function(id) {
    return $http.get('/api/gposts/' + id).then(function(res){
      return res.data;
    });
  };
  o.addGroupComment = function(id, gcomment) {
    return $http.post('/api/gposts/' + id + '/gcomments', gcomment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  return o;
}]);

app.factory('gcomments', ['$http', 'auth', function($http, auth){
  var o = {
    gcomments: []
  };  
  o.getAll = function() {
    return $http.get('/api/gcomments').success(function(data){
      angular.copy(data, o.gcomments);
    });
  };
  return o;
}]); 