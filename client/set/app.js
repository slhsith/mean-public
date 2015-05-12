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
    });
  // $urlRouterProvider.otherwise('home');
}]);