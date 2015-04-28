var app = angular.module('mainApp', ['ui.router','templates']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('emailVerify', {
      url: '/emailVerify/:email/:token',
      templateUrl: 'emailVerify.html',
      controller: 'MainCtrl',
    })
    .state('resetPassword', {
      url: '/resetPassword/:email/:token',
      templateUrl: '/views/resetPassword.html',
      controller: 'MainCtrl',
    }); 
  // $urlRouterProvider.otherwise('home');
}]);