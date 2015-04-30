var app = angular.module('mainApp', ['ui.router','templates']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('emailVerify', {
      url: '/emailVerify',
      templateUrl: 'emailVerify.html',
      controller: 'MainCtrl'
    })
    .state('resetPassword', {
      url: '/resetPassword/:username/:user_token',
      templateUrl: 'resetPassword.html',
      controller: 'ResetCtrl',
    }); 
  // $urlRouterProvider.otherwise('home');
}]);
app.controller('MainCtrl', ['$scope', '$location', function ($scope) {
  $scope.verifyEmail = function() {
    confirmEmail.confirm($scope.verify).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

}]);
app.controller('ResetCtrl', ['$scope', '$location', function ($scope) {
  $scope.resetPassword = function() {
    resetPassword.set($scope.user).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    });
  };
}]);
app.factory('confirmEmail',['$http', '$window', function ($http, $window) {
  var confirmEmail = {};
  confirmEmail.confirm = function (user) {
    return $http.put('/api/emailverify/:username/:token').success(function (data) {
    });
  };
  return confirmEmail;
}]);

app.factory('resetPassword',['$http','$window', function ($http, $window) {
  var resetPassword = {};
  resetPassword.reset = function (user) {
    return $http.get('/resetPassword/:username/:user_token').success(function (data) {
    });
  };
  resetPassword.set  = function (user) {
    return $http.get('/resetPassword/:username/:user_token').success(function (data) {
    });
  };
  return resetPassword;
}]);