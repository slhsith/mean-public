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
        verification: function($stateParams, verification) {
          return verification.emailVerify($stateParams.username, $stateParams.user_token);
        }
      },
      controller: 'MainCtrl'
    })
    .state('resetPassword', {
      url: '/resetpassword/:username/:token',
      templateUrl: 'resetPassword.html',
      controller: 'ResetCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'search.html',
      controller: 'SearchCtrl'
    })
    .state('userProfile', {
      url: '/user/:handle',
      templateUrl: 'userProfile.html',
      controller: 'UserCtrl',
      resolve: {
        usersPromise: function($stateParams, users) {
          return users.get($stateParams.id);
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
  console.log('Redirecting to user app');
  window.location = 'http://localhost:3000/user/#/home';
});

app.controller('ResetCtrl', function ($scope, $state, verification) {
  $scope.submitPassword = function(user) {
    console.log($state.params.username);
    console.log($state.params.token);
    console.log($scope.user.password);
    console.log($scope.user.repeat_password);
    verification.updatePassword(user, $state.params.username, $state.params.token, $scope.user.password).success(function () {
      // redirect home
      
    }).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    });
  }; 
});

app.controller('SearchCtrl', function ($scope) {
  $scope.submitSearch = function () {
    console.log($scope.search);
    search.query($scope.search);
  };
});

app.controller('UserCtrl', function ($scope, users, auth, usersPromise) {
  $scope.user = usersPromise.data;
  console.log(usersPromise);
});
app.factory('verification', function ($http, $window) {
  return {
      getUser: function getUserMethod(user, name, token) {
          return $http.get('/resetpassword/'+ name + '/' + token)
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
      updatePassword: function updatePasswordMethod(user, name, token, password) {
          return $http.put('/api/resetpassword/'+ name + '/' + token).success(function (data) {
            console.log('Success!');
          });
      }
  };
});

app.factory('search', function ($http) {
  return {
    search: function searchMethod(q) {
    
      return $http.post('/search/', {query: q} ).success(function (data) {
        return data;
      });
    }
  };
});

app.factory('users',['$http', '$window', function($http, $window){
  var u = {
    users: []
  };
  u.get = function (id) {
    return $http.get('/api/user/' + id).success(function(data){
      console.log(data);
      return data;
    });
  };
  return u;
}]);