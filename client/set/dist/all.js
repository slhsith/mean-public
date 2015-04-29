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
      url: '/resetPassword',
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
    resetPassword.reset($scope.verify).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
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

app.factory('resetPassword',['$hhtp','$window', function ($http, $window) {
  var resetPassword = {};
  resetPassword.reset = function (user) {
    return $http.put('/api/resetPassword/:email/:token').success(function (data) {
    });
  };
  return resetPassword;
}]);