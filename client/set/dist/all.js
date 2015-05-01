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
      url: '/resetPassword/:username/:token',
      templateUrl: 'resetPassword.html',
      controller: 'ResetCtrl'
    }); 
  // $urlRouterProvider.otherwise('home');
}]);
app.controller('MainCtrl', ['$scope', '$location', function ($scope) {
  // $scope.verifyEmail = function() {
  //   confirmEmail.confirm($scope.verify).error(function (error) {
  //     $scope.error = error;
  //     $scope.showSuccessAlert = true;
  //   }).then(function () {
  //     window.location = "http://localhost:3000/user/#/home";
  //   });
  // };

}]);
app.controller('ResetCtrl', function ($scope, $state, verification) {
  $scope.submitPassword = function() {
    console.log($state.params.username);
    console.log($state.params.token);
    console.log($scope.user.password);
    console.log($scope.user.repeat_password);
    verification.updatePassword(user, $state.params.username, $state.params.token).success(function () {
      // redirect home
      
    }).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    });
  }; 
});
app.factory('verification', function ($http, $window) {
  return {
      getUser: function getUserMethod(user, name, token) {
          return $http.get('/resetPassword/'+ name + '/' + token).success(function (data) {
            return data;
          });
      },
      emailVerify: function emailVerifyMethod(user, name, token) {
          return $http.put('/api/emailverify/:username/:token').success(function (data) {
          });
      },
      updatePassword: function updatePasswordMethod(user, name, token) {
          return $http.put('/api/resetPassword/'+ name + '/' + token).success(function (data) {
            console.log('Success!');
          });
      }
  };
});