/*  -----------------  *
    APP MODULE - USER 
 *  -----------------  */
 var app = angular.module('mainApp', ['ui.router','templates']);

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
        postsPromise: function(posts){
          return posts.getAll();
        }
      }
    })
    .state('post', {
      url: '/post/:post',
      templateUrl: 'posts.html',
      controller: 'PostsCtrl',
      resolve: {
        postPromise: function($stateParams, posts) {
          return posts.get($stateParams.post);
        }
      }
    })
    .state('shop', {
      url: '/shop',
      templateUrl: 'shop.html',
      controller: 'ShopCtrl',
      resolve: {
        itemPromise: function (items) {
          return items.getAll();
        }
      }
    })
    .state('items', {
      url: '/items/:item',
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
    .state('groups', {
      url: '/groups',
      templateUrl: 'groups.html',
      controller: 'GroupsCtrl',
      resolve: {
        groupPromise: function(groups){
          return groups.getAll();
        }
      }
    })
    .state('groupHome', {
      url: '/group/:id',
      templateUrl: 'group_home.html',
      controller: 'GHomeCtrl',
      resolve: {
        groupsPromise: function($stateParams, groups){
          return groups.get($stateParams.id);
        }
      }
    })

    .state('messenger', {
      url: '/messenger',
      templateUrl: 'messenger.html',
      controller: 'MessengerCtrl',
      resolve: {
        conversationsPromise: function(messenger) {
          return messenger.getAll();
        }
      }
    })
    // .state('/gposts', {
    //   url: '/gposts/:gpost',
    //   templateUrl: 'gposts.html',
    //   controller: 'GpostCtrl',
    //   resolve: {
    //     gcommentPromise: ['gcomments', function(gcomments){
    //       return gcomments.getAll();
    //     }]
    //   }
    // })
    .state('settings', {
     url: '/settings',
     templateUrl: 'settings.html',
     controller: 'SettingsCtrl',
     resolve: {
       languagePromise: function (languages) {
         return languages.getAll();
       },
       userPromise: function ($stateParams, settings) {
        return settings.get($stateParams.handle);
       }
     }
   });
  // $urlRouterProvider.otherwise('home');
}]);