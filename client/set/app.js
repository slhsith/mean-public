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
      resolve: { 
               RedirectAccount: function() {
                   return confirmEmail.confirm();
               }
    })
    .state('resetPassword', {
      url: '/resetPassword/:email/:token',
      templateUrl: '/views/resetPassword.html',
      controller: 'ResetCtrl',
      resolve: { 
               RedirectAccount: function() {
                   return resetPassword.reset();
               }
    }); 
  // $urlRouterProvider.otherwise('home');
}]);