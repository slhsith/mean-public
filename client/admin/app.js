var app = angular.module('mainApp', ['ui.router','templates']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl',
      resolve: {
        usersPromise: function (users) {
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
      url: '/user/:id',
      templateUrl: 'users.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: function($stateParams, users) {
          return users.get($stateParams.id);
        }
      }
    });

  $urlRouterProvider.otherwise('home');

  // $httpProvider.interceptors.push('httpRequestInterceptor');

});

