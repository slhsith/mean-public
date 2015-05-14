var app = angular.module('mainApp', ['ui.router','templates']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl',
      resolve: {
        userPromise: function (users) {
         return users.getAll();
       }
      }
    })
    .state('orders', {
      url: '/orders',
      templateUrl: 'orders.html',
      controller: 'MainCtrl',
    })
    .state('user', {
      url: '/user/{id}',
      templateUrl: 'users.html',
      controller: 'UserCtrl',
      resolve: {
        usersPromise: function($stateParams, users) {
          return users.get($stateParams.id);
        }
      }
    });

  $urlRouterProvider.otherwise('home');
}]);