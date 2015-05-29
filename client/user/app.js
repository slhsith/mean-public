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
      templateUrl: 'post.html',
      controller: 'PostCtrl',
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
        },
        userPromise: function ($stateParams, users) {
          return users.get($stateParams.id);
        }
      }
    })
    .state('items', {
      url: '/items/:item',
      templateUrl: 'items.html',
      controller: 'ItemsCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          console.log($stateParams);
      
          return items.get($stateParams.item);
        }
      }
    })
    .state('diet', {
      url: '/items/:id/diet/',
      templateUrl: 'diet.html',
      controller: 'ItemsCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          console.log($stateParams.id);
          return items.get($stateParams.id);
        }
      }
    })
    .state('challenge', {
      url: '/items/challenge/:id',
      templateUrl: 'challenge.html',
      controller: 'ItemsCtrl',
      resolve: {
        itemPromise: function($stateParams, items) {
          console.log($stateParams.id);
          return items.get($stateParams.id);
        }
      }
    })
    .state('transactions', {
      url: '/transactions',
      templateUrl: 'transactions.html',
      controller: 'TransCtrl',
      resolve: {
        item: ['$stateParams', 'items', function($stateParams, items) {
          return items.get($stateParams.item);
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
        },
        gpostsPromise: function ($stateParams, gposts){
          return gposts.getAll($stateParams.id);
        }
      }
    })
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
  // $urlRouterProvider.otherwise('home');
}]);
/*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: req.query.file_name, 
        Expires: 60, 
        ContentType: req.query.file_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in 
 * a way that suits your application.
 */
app.post('/submit_form', function(req, res){
    username = req.body.username;
    full_name = req.body.full_name;
    avatar_url = req.body.avatar_url;
    update_account(username, full_name, avatar_url); // TODO: create this function
    // TODO: Return something useful or redirect
});