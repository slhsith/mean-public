app.factory('posts', ['$http', 'auth', function($http, auth){
  var o = {
    posts: []
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
    auth.isAdmin = function(){
      var token = auth.getToken();

      if(token){
       var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.permissions === 'Admin';
      } else {
        return false;
      }
    };
    auth.logOut = function(){
      $window.localStorage.removeItem('admin-token');
      $window.location = "http://localhost:3000/";
    };
  return auth;
}]);

// FIGURING OUT IF WE CAN ATTACH HEADERS WITH EVERY HTTP, not quite working,
// some circular reference issue
// app.factory('httpRequestInterceptor', function (auth) {
//   return {
//     request: function (config) {

//       // use this to destroying other existing headers
//       // config.headers = {'Authentication':'authentication'}
//       // use this to prevent destroying other existing headers
//       config.headers['Authorization'] = 'Bearer '+auth.getToken();

//       return config;
//     }
//   };
// });

app.factory('users', function ($http, $window, auth) {
  var u = {
    users: []
  };
  u.getAll = function() {
    return $http.get('/api/users').success(function(data){
      angular.copy(data, u.users);
    });
  };
  u.get = function (id) {
    return $http.get('/api/user/' + id).success(function(data){
      console.log(data);
      return data;
    });
  };
  u.update = function (user){
    console.log('updating user', user);
    return $http.put('/api/settings', user).success(function(data){
        u.users = data;
    });
  };
  return u;
});

app.factory('settings', ['$http', '$window', function($http, $window){
   var s = { settings : {} };
   s.getAll = function (){
    return $http.get('/api/settings').success(function(data){
      angular.copy(data, s.settings);
    });
   };
   
   return s;
}]);