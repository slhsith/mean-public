/*  ----------------  *
    APP MODULE - SET
 *  ----------------  */
var app = angular.module('mainApp', ['ui.router','templates', 'uiGmapgoogle-maps']);

app.config([
'$stateProvider',
'$urlRouterProvider','uiGmapGoogleMapApiProvider',
function($stateProvider, $urlRouterProvider, GoogleMapApi) {
  $stateProvider
    .state('emailVerify', {
      url: '/emailverify/:username/:user_token',
      templateUrl: 'emailVerify.html',
      resolve: {
        verifyPromise: function($stateParams, verification) {
          return verification.emailVerify($stateParams.username, $stateParams.user_token);
        }
      },
      controller: 'MainCtrl'
    })
    .state('resetPassword', {
      url: '/resetpassword/:username/:user_token',
      templateUrl: 'resetPassword.html',
      resolve: {
        resetPromise: function($stateParams, verification) {
          return verification.getUser($stateParams.username, $stateParams.user_token);
        }
      },
      controller: 'ResetCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'search.html',
      controller: 'SearchCtrl',
      resolve: {
        searchPromise: function($stateParams, search) {
          return search.get($stateParams.query);
        }
      }
    })
    .state('searchResults', {
      url: '/search/:query',
      templateUrl: 'search.html',
      controller: 'SearchCtrl',
      resolve: {
        searchPromise: function($stateParams, search) {
          return search.get($stateParams.query);
        }
      }
    })
    .state('mapResults', {
      url: '/mapResults',
      templateUrl: 'map.html',
      controller: 'MapCtrl',
      config: GoogleMapApi.configure({
        key: 'AIzaSyDHlTfALoPx_zwBB15W1obqHcrtXk8ObVA',
        v: '3.17',
        libraries: 'places'
      })
    })
    .state('userProfile', {
      url: '/user/:handle',
      templateUrl: 'userProfile.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: function($stateParams, users) {
          return users.get($stateParams.handle);
        }
      }
    })
    .state('item', {
      url: '/item/:item',
      templateUrl: 'item.html',
      controller: 'ItemCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          return items.get($stateParams.item);
        }
      }
    });
  // $urlRouterProvider.otherwise('home');
}]);
/*  -----------------  *
    CONTROLLERS - SET
 *  -----------------  */
app.controller('MainCtrl', function ($scope) {
  // $scope.verifyEmail = function() {
  //   confirmEmail.confirm($scope.verify).error(function (error) {
  //     $scope.error = error;
  //     $scope.showSuccessAlert = true;
  //   }).then(function () {
  //     window.location = "http://localhost:3000/user/#/home";
  //   });
  // };
  // console.log('Redirecting to user app');
  // window.location = 'http://localhost:3000/user/#/home';
});

app.controller('ResetCtrl', function ($scope, $state, verification) {
  $scope.submitPassword = function() {
    $scope.user.username = $state.params.username;
    $scope.user.user_token = $state.params.user_token;
    verification.updatePassword($scope.user).success(function () {
      // redirect home
      console.log('Redirecting to user app');
      window.location = '/';
    }).error(function (error) {
      $scope.error = error;
    });
  }; 
});

app.controller('SearchCtrl', function ($scope, search, searchPromise) {
  $scope.users = searchPromise.data;
  console.log(searchPromise);
  $scope.submitSearch = function (data) {
    console.log($scope.search);
    search.get($scope.search);
    $scope.users.push(data);
  };
});



app.controller('MapCtrl', function ($scope) {
  var mapOptions = {};
  var map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);
  var events = {
    places_changed: function (searchBox) {}
  };
  $scope.map = { 
    center: { latitude: 45, longitude: -99 }, 
    zoom: 8,
    options: {scrollwheel: false},
    searchbox: { template:'searchbox.tpl.html', events:events}
  };
});


app.controller('UserCtrl', function ($scope, users, $stateParams, userPromise, auth) {
  $scope.user = userPromise.data;
  console.log(userPromise);
  $scope.followUser = function () {
    users.addFollower($stateParams.handle);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isFollowing = auth.isFollowing;
});

app.controller('ItemCtrl', function ($scope, items, itemPromise, auth) {
  $scope.item = itemPromise.data;
});


/*  ---------------  *
    FACTORIES - SET
 *  ---------------  */
 
 app.factory('verification', function ($http, $window) {
  return {
      getUser: function getUserMethod(username, user_token) {
          return $http.get('/api/resetpassword/' + username + '/' + user_token)
          .success(function (data) {
            return data;
          });
      },
      emailVerify: function emailVerifyMethod(username, user_token) {
          return $http.put('/api/emailverify/' + username + '/' + user_token)
          .success(function (data) {
            console.log(data.message);
          });
      },
      updatePassword: function updatePasswordMethod(user) {
        return $http.put('/api/resetpassword/'+ user.username + '/' + user.user_token, user)
        .success(function (data) {
          console.log('Success!');
        });
      }
  };
});

// app.factory('search', function ($http) {
//   var u = {
//     users: []
//   };
//   u.get = function (query) {
//     return $http.get('/api/search/' + query).success(function(data){
//       console.log(data);
//       return data;
//     });
//   };
//   return u;
// });

app.factory('users', function ($http, $window) {
  var u = {
    users: []
  };
  u.get = function (handle) {
    return $http.get('/api/user/handle/' + handle).success(function(data){
      // console.log(data);
      return data;
    });
  };
  u.addFollower = function (id, user) {
    return $http.post('/api/user/'+ id + '/followers', user).success(function(data){
      return data;
    });
  };
  return u;
});
app.factory('items', function ($http, $window) {
  var i = {
    items:[]
  };
  i.get = function (item) {
    return $http.get('/api/item/' + item).then(function(res){
      return res;
    });
  };
  return i;
}); 

// AUTH
app.factory('auth', function($http, $window){
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
});