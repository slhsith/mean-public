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
app.controller('ResetCtrl', ['$scope', '$location','$state', '$stateParams', 'resetPassword', function ($scope, $state, $stateParams, resetPassword) {
  $scope.submitPassword = function() {
    console.log($scope.user);
    console.log($stateParams.username);
    console.log($stateParams.token);
    // resetPassword.updatePassword($scope., $stateParams.username, $stateParams.token);
// .success(function () {
//       // output message
//       // redirect them home
//     })
//     .error(function (error) {
//       $scope.error = error;
//       $scope.showSuccessAlert = true;
//     });
  }; 
}]);
// app.factory('confirmEmail',['$http', '$window', function ($http, $window) {
//   var confirmEmail = {};
//   confirmEmail.confirm = function (user) {
//     return $http.put('/api/emailverify/:username/:token').success(function (data) {
//     });
//   };
//   return confirmEmail;
// }]);

app.factory('resetPassword',['$http','$window', function ($http, $window) {
  var resetPassword = {};
  resetPassword.reset = function (user, name, token) {
    return $http.get('/resetPassword/'+ name + '/' + token).success(function (data) {
      return data;
    });
  };
  resetPassword.updatePassword  = function (user, name, token, req) {
    return $http.put('/api/resetPassword/'+ name + '/' + token).success(function (data) {
      user.password = req.body.password;
      console.log('Success!');
    });
  };
  return resetPassword;
}]);