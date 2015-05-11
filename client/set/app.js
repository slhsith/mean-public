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
    })
    .state('search', {
      url: '/search',
      templateUrl: 'search.html',
      controller: 'SearchCtrl'
    });
  // $urlRouterProvider.otherwise('home');
}]);