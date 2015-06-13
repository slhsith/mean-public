/*  -----------------  *
    APP MODULE - USER 
 *  -----------------  */
var app = angular.module('mainApp', [
  'ui.router',
  'templates',
  'ngFileUpload',
  'btford.socket-io'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // ------- HOME / DASH ------- //
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'DashCtrl',
      resolve: {
        postsPromise: function(posts){
          return posts.getAll();
        },
        itemsPromise: function(items, auth){
          if (auth.isContributor()) {
            return items.getMine();
          }
          return items.getAll();
        },
        eventsPromise: function(events, auth){
          if (auth.isContributor()) {
            return events.getMine();
          }
          return events.getAll();
        }
      }
    })
    .state('post', {
      url: '/post/:post',
      templateUrl: 'post.html',
      controller: 'PostCtrl',
      resolve: {
        postPromise: function($stateParams, posts) {
          return posts.get($stateParams.post);
        }
      }
    })

    // ------- ITEMS ------- //
    .state('shop', {
      url: '/shop',
      templateUrl: 'shop.html',
      controller: 'ShopCtrl',
      resolve: {
        itemPromise: function (items) {
          return items.getAll();
        }
        // , userPromise: function (auth, users) {
        //   return users.get(auth.isThisUser());
        // }
      }
    })
    .state('item', {
      url: '/item/:item_id',
      templateUrl: 'item.tpl.html',
      controller: 'ItemCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          return items.get($stateParams.item_id);
        }
      }
    })
    .state('workoutPlan', {
      url: '/item/workoutplan/:id',
      templateUrl: 'workoutPlan.html',
      controller: 'ItemsCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          console.log($stateParams.id);
          return items.get($stateParams.id);
        }
      }
    })
    .state('exerciseSteps', {
      url: '/items/exercise/:exercise',
      templateUrl: 'exerciseSteps.html',
      controller: 'ExerciseCtrl',
      resolve: {
        exercisePromise: function($stateParams, items) {
          console.log($stateParams.exercise);
          return items.getExercise($stateParams.exercise);
        }
      }
    })
    .state('stepConsumption', {
      url: '/items/step/:step',
      templateUrl: 'stepConsumption.html',
      controller: 'StepCtrl',
      resolve: {
        stepPromise: function($stateParams, items) {
          console.log($stateParams.step);
          return items.getStep($stateParams.step);
        }
      }
    })

    // ------- EVENTS ------- //
    .state('events', {
      url: '/events',
      templateUrl: 'events.tpl.html',
      controller: 'EventsCtrl',
      resolve: {
        eventsPromise: function($stateParams, events) {
          return events.getAll();
        }
      }
    })
    .state('event', {
      url: '/event/:event_id',
      templateUrl: 'event.tpl.html',
      controller: 'EventsCtrl',
      resolve: {
        eventPromise: function($stateParams, events) {
          return events.get($stateParams.event_id);
        }
      }
    })    
    .state('bootcamp', {
      url: '/event/bootcamp/:id',
      templateUrl: 'event.tpl.html',
      controller: 'EventsCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          console.log($stateParams.id);
          return items.get($stateParams.id);
        }
      }
    })
    .state('challenge', {
      url: '/event/challenge/:id',
      templateUrl: 'event.tpl.html',
      controller: 'EventCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          console.log($stateParams.id);
          return items.get($stateParams.id);
        }
      }
    })

    // ------- PURCHASING ------- //
    .state('transactionsitem', {
      url: '/transactions/item/:item_id',
      templateUrl: 'transactions.html',
      controller: 'TransCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          return items.get($stateParams.item_id);
        }
      }    
    })
    .state('transactionsevent', {
      url: '/transactions/event/:event_id',
      templateUrl: 'transactions.html',
      controller: 'TransCtrl',
      resolve: {
        eventPromise: function($stateParams, events) {
          return events.get($stateParams.event_id);
        }
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

    // ------- GROUPS ------- //
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

    // ------- MESSENGER ------- //
    .state('messenger', {
      url: '/messenger',
      templateUrl: 'messenger.html',
      controller: 'MessengerCtrl',
      resolve: {
        usersPromise: function(users) {
          return users.getAll();
        },
        conversationsPromise: function(messenger) {
          return messenger.getAll();
        }
      }
    })


    // ------- SETTINGS ------- //
    .state('settings', {
       url: '/settings/:id',
       templateUrl: 'settings.html',
       controller: 'SettingsCtrl',
       resolve: {
         languagePromise: function (languages) {
           return languages.getAll();
         },
         userPromise: function ($stateParams, users) {
          return users.get($stateParams.id);
         }
       }
    })

    .state('user', {
      url: '/user/:handle',
      templateUrl: 'users.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: function($stateParams, users) {
          return users.get($stateParams.id);
        }
      }
    });

  $urlRouterProvider.otherwise('home');
});
