var app = angular.module('mainApp', ['ui.router','templates']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl',
      resolve: {
        usersPromise: function (users) {
         return users.getAll();
       }
      }
    })
    .state('orders', {
      url: '/orders',
      templateUrl: 'orders.html',
      controller: 'MainCtrl',
    })
    .state('user', {
      url: '/user/:id',
      templateUrl: 'users.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: function($stateParams, users) {
          return users.get($stateParams.id);
        }
      }
    });

  $urlRouterProvider.otherwise('home');

  // $httpProvider.interceptors.push('httpRequestInterceptor');

});


app.controller('MainCtrl', function ($scope, users, auth, popupService){

  $scope.deleteUser = function (user) {
    console.log('delete', user._id);
    if (popupService.showPopup('Are you sure you want to delete this user?')) {
      users.delete(user._id).success(function(data){
        console.log(data.message);
        $state.go('home');
      });
    }
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.users = users.users;
});

app.controller('UserCtrl', function ($scope, users, auth, userPromise) {
  $scope.user = userPromise.data;
  $scope.isAdmin = auth.isAdmin;
  $scope.update = function() {
    console.log($scope.user);
    users.update($scope.user);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings: Update User");
  };
});

app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isAdmin = auth.isAdmin;
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);
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

        return payload.permissions == 'Admin';
      } else {
        return false;
      }
    };
    auth.logOut = function(){
      $window.localStorage.removeItem('admin-token');
      $window.location = "/";
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
  u.delete = function(user_id) {
    return $http.delete('/api/user/' + user_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
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

app.service('popupService', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  };
});