var app = angular.module('mainApp', ['ui.router','templates', 'ngImgCrop', 'flow']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'DashCtrl',
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
    .state('shop', {
      url: '/shop',
      templateUrl: 'shop.html',
      controller: 'ShopCtrl',
      resolve: {
        itemPromise: ['items', function(items){
          return items.getAll();
        }],
        videoPromise: ['items', function (items) {
          return items.getAllVideos();
        }]
      }
    })
    .state('items', {
      url: '/items/{id}',
      templateUrl: 'items.html',
      controller: 'ItemsCtrl',
      resolve: {
        item: ['$stateParams', 'items', function($stateParams, items) {
          return items.get($stateParams.id);
        }]
      }
    })
    .state('transactions', {
      url: '/transactions',
      templateUrl: 'transactions.html',
      controller: 'TransCtrl',
      resolve: {
        item: ['$stateParams', 'items', function($stateParams, items) {
          return items.get($stateParams.id);
        }]
      }    
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'checkout.html',
      controller: 'CheckoutCtrl',
      resolve: {
        item: ['$stateParams', 'items', function($stateParams, items) {
          return items.get($stateParams.id);
        }]    
      }
    })  
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html',
      controller: 'SettingsCtrl',
      // resolve: {
      //   language: ['$stateParams', 'languages', function($stateParams, languages) {
      //     return languages.get($stateParams.id);
      //   }]
      // }
    });
  // $urlRouterProvider.otherwise('home');
}]);