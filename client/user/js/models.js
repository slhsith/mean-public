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
      angular.copy(data, o.items);
    });
  };
}]);  


app.factory('items', ['$http', 'auth', function($http, auth){
  var o = {
    items: [],
    item: {},
    videos: [],
    video: {},
    books: [],
    book: {}
  };
  o.getAll = function() {
    return $http.get('/api/items').success(function(data){
      angular.copy(data, o.items);
    });
  };
  o.getAllVideos = function () {
    return $http.get('/api/videos').success(function(data){
      angular.copy(data, o.videos);
    });
  };
  o.create = function(item) {
    return $http.post('/api/items', item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, item);
      o.items.push(extendedItem);
      // will be added to the appropriate service object subarray
      // based on submitted type
      o[item.type + 's'].push(extendedItem);
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
  o.purchase = function(card) {
    console.log(card);
    return $http.post('api/transactions', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
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
    auth.getUser = function (){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload;
      }
    };
  return auth;
}]);

app.factory('languages', ['$http', '$window', function($http, $window){
  var lang = { languages : [] };
                       // no function parameters -- function ()
  lang.getAll = function () { 
    return $http.get('/api/languages').success(function(data){
      console.log(data); // <<-- does this print anything?
      // angular.copy(data, lang.languages);
    });
  };
  lang.addLanguage = function (language) {
    console.log(language);
    return $http.post('/api/languages', { 'name': language }).success(function(data){
      console.log(data);
      lang.languages.push(data);
    });
  }; 
  
  return lang; // <------ this factory hasn't returned its methods publically yet
}]);
app.factory('settings', ['$http', '$window', function($http, $window){
  return {
    test: function test(setting){
      console.log(setting);
    },
    getSettings: function getSettings() {
      return $http.get('/api/settings/', {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        angular.copy(data, o.items);
      });
    },
    update: function update(){
      return $http.put('/api/settings/').success(function(data){
        o.settings.push(data);
      });
    }
  };
}]);