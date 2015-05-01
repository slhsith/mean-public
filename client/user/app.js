var app = angular.module('mainApp', ['ui.router','templates', 'ngImgCrop', 'flow']);

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
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
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
    })
    .state('items', {
      url: '/items/{id}',
      templateUrl: 'items.html',
      controller: 'ItemsCtrl',
      resolve: {
        post: ['$stateParams', 'items', function($stateParams, items) {
          return items.get($stateParams.id);
        }]
      }
    })
    .state('shop', {
      url: '/shop',
      templateUrl: 'shop.html',
      controller: 'ShopCtrl',
      resolve: {
        itemPromise: ['items', function(items){
          return items.getAll();
        }]
      }
    })
    .state('transactions', {
      url: '/items/transactions',
      templateUrl: 'transactions.html',
      controller: 'TransCtrl',
      resolve: {
        post: ['$stateParams', 'transactions', function($stateParams, transactions) {
          return transactions.get($stateParams.id);
        }]
      }
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html',
      controller: 'SettingsCtrl',
    });

  // $urlRouterProvider.otherwise('home');
}]);