var app = angular.module('mainApp', ['ui.router','templates']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
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
    .state('userProfile', {
      url: '/user/:handle',
      templateUrl: 'userProfile.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: function($stateParams, users) {
          return users.get($stateParams.handle);
        }
      }
    });
  // $urlRouterProvider.otherwise('home');
}]);
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
  $scope.user = searchPromise.data;
  console.log(searchPromise);
  $scope.submitSearch = function (data) {
    console.log($scope.search);
    search.get($scope.search);
    // $scope.users.push(data);
  };
});

app.controller('UserCtrl', function ($scope, users, userPromise) {
  $scope.user = userPromise.data;
  console.log(userPromise);
});
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

app.factory('search', function ($http) {
  var u = {
    users: []
  };
  u.get = function (query) {
    return $http.get('/api/search/' + query).success(function(data){
      console.log(data);
      return data;
    });
  };
  return u;
});

app.factory('users',['$http', '$window', function($http, $window){
  var u = {
    users: []
  };
  u.get = function (handle) {
    return $http.get('/api/user/handle/' + handle).success(function(data){
      // console.log(data);
      return data;
    });
  };
  return u;
}]);