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
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    });
    // .state('users', {
    //   url: '/users/{id}',
    //   templateUrl: 'users.html',
    //   controller: 'PostsCtrl',
    //   resolve: {
    //     postPromise: function($stateParams, posts) {
    //       return users.get($stateParams.id);
    //     }]
    //   }
    // });

  $urlRouterProvider.otherwise('home');
}]);