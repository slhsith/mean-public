/*  -----------------  *
    APP MODULE - USER 
 *  -----------------  */
var app = angular.module('mainApp', ['ui.router','templates', 'btford.socket-io']);
// var app = angular.module('mainApp', ['ui.router','templates', 'btford.socket-io']);

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
    .state('workoutPlan', {
      url: '/items/workoutPlan/:id',
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
        userPromise: function(auth, users) {
          var _id = auth.isThisUser();
          return users.get(_id);
        },
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
/*  ------------------  *
    CONTROLLERS - USER
 *  ------------------  */

 app.controller('MainCtrl', function ($scope, auth, messageSocket) {
  
    $scope.user = auth.getUser();
    mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.people.set({
    //     "$name": $scope.user.firstname + ' ' + $scope.user.lastname,
        "$email": $scope.user.username,
    //     "$created": $scope.user.created,
    //     "gender" : $scope.user.gender,
    //     "age" : $scope.user.age,
    //     "type" : $scope.user.permissions,
        "$last_login": new Date()
    });
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isUser = auth.isUser;
  $scope.isAdmin = auth.isAdmin;
  $scope.logOut = auth.logOut;
  $scope.isThisUser = auth.isThisUser;


  $scope.$on('socket:tokenrequest', function(event, data) {
    console.log('socket:tokenrequest', event.name, data);
    console.log(data.message);
    messageSocket.emit('authenticate', { token: auth.getToken() });
  });

  $scope.$on('socket:broadcast', function(event, data) {
    console.log('broadcast to socket', event.name, data);
  });
  
});


app.controller('DashCtrl', function ($scope, posts, auth) {

  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Post",{"area":"group", "page":"groupHome", "action":"create"});
    // mixpanel.track("User Dashboard: Add Post");
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Post",{"area":"group", "page":"groupHome", "action":"upvote"});
    // mixpanel.track("User Dashboard: Upvoted Comment");
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;

});


app.controller('PostCtrl', function ($scope, auth, posts, postPromise) {

  $scope.post = postPromise.data;
  $scope.comment = { 
    post: $scope.post._id, 
    body: null, 
    author: $scope.user.username 
  };

  $scope.addComment = function() {
    if (!$scope.comment.body || $scope.comment.body === '') { return; }
    posts.addComment($scope.post, $scope.comment).success(function(comment) {
      $scope.post.comments.push(comment);
      $scope.comment.body = null;
    });
    $scope.body = '';
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Comment",{"area":"group", "page":"groupHome", "action":"comment"});
  };
  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post, comment);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Comment",{"area":"group", "page":"groupHome", "action":"upvote"});
  };
  $scope.incrementUpvotes = function(comment) {
    posts.upvoteComment($scope.post, comment);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});


app.controller('ShopCtrl', function ($scope, items, auth, userPromise) {

  $scope.items = items.items;
  $scope.user = userPromise;
  $scope.addItem = function() {
    items.create($scope.item).success(function(data){
      console.log('success');
      $scope.items = items.items;
      console.log(data);
   }).error(function(){
       console.log('failure');
   });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Item",{"area":"shop", "page":"shop", "action":"create"});
   // mixpanel.track("Shop Page: Added Item");
 };

  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Shop Page: Upvoted Comment");
  };  
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});


app.controller('ItemsCtrl', function ($scope, items, auth, $stateParams, itemPromise) {

  $scope.items = items.items;
  $scope.item = itemPromise;
  $scope.createDay = function(){
    items.newDay($stateParams.id, $scope.day.day).success(function(day) {
      $scope.item.days.push(day);
    });
  };
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Items Page: Upvoted Comment");
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
  $scope.addPlan = function() {
    items.newPlan($scope.workoutPlan, $stateParams.id).success(function(data){
      console.log('success');
      $scope.item.exercises.push(data);
   }).error(function(){
       console.log('failure');
   });
  };
});

app.controller('ExerciseCtrl', function ($scope, items, exercisePromise, $stateParams) {
  $scope.exercise = exercisePromise;
  $scope.addStep = function() {
    items.newStep($scope.step, $stateParams.exercise).success(function(data){
      console.log('success');
      $scope.step = null;
      $scope.exercise.steps.push(data);
   }).error(function(){
       console.log('failure');
   });
  };
});

app.controller('StepCtrl', function ($scope, items, stepPromise, $stateParams) {
  $scope.step = stepPromise;
});


app.controller('NavCtrl', function ($scope, auth) {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.home = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
});

app.controller('TransCtrl', function ($scope, items, auth, transactions) {
  $scope.startTrans = function () {
    console.log($scope.card);
    transactions.purchase($scope.card);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Start Transaction",{"area":"shop", "page":"transactions", "action":"transaction"});
    // mixpanel.track("Checkout: Purchase Item");
    // mixpanel.people.track_charge(10,{  item: $scope.item.name, type: $scope.item.type, "$time": new Date() });
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});


app.controller('SettingsCtrl', function ($scope, languages, settings, userPromise, auth) {
  $scope.user = angular.extend($scope.user, settings.settings);
  $scope.languages = languages.languages;
  $scope.addLanguage = function(){
    console.log($scope.language.name);
    languages.addLanguage($scope.language.name).success(function(data) {
    $scope.languages.push(data);
    });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Languange",{"area":"settings", "page":"settings", "action":"add"});
  };
  $scope.updateSettings = function() {
    console.log($scope.user);
    settings.update($scope.user);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings update",{"area":"settings", "page":"settings", "action":"update"});
    // mixpanel.track("Settings: Update User");
  };
  $scope.user = userPromise.data;
  console.log(userPromise);
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
  $scope.isThisUser = auth.isThisUser;
});

app.controller('GroupsCtrl',
function ($scope, groups, auth) {

  $scope.groups = groups.groups;
  $scope.addGroup = function(){
    groups.create($scope.group);
    console.log($scope.group);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Group", {"area":"group", "page":"groups", "action":"create"});
  };
  $scope.group = '';
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});

app.controller('GHomeCtrl',
function ($scope, auth, groups, gposts, gcomments, groupsPromise, $stateParams){
  var group = groups.group[$stateParams.id];
  var gpost = gposts.gpost[$stateParams.id];
  // var gpost = gposts.gpost[$stateParams.id];
  $scope.group = groupsPromise.data;
  console.log(groupsPromise.data);
  // $scope.gpost = gpostsPromise.data;
  // console.log(gpostsPromise.data);

  $scope.currentUser = auth.currentUser();
  $scope.groups = groups.groups;
  $scope.gposts = gposts.gposts;
  $scope.gcomments = gcomments.gcomments;
  $scope.addGpost = function(){
    // if(!$scope.body || $scope.body === '') { return; }
    groups.createGpost($scope.group, $scope.gpost).success(function(gpost) {
      $scope.group.gposts.push(gpost);
      $scope.gpost.body = null;
    });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Post", {"area":"group", "page":"groupHome", "action":"create"});
  };
  $scope.addGcomment = function (gpost) {
    // groups.createGcomment($scope.gpost, $scope.gcomment)
    console.log(gpost);
    console.log($scope.gcomment);
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
  
  // $scope.addComment = function(){
  //   console.log($scope.post);
  //   // posts.addComment(posts.post._id, {
  //   //   body: $scope.post.comment,
  //   //   author: $scope.currentUser
  //   // }).success(function(comment) {
  //   //   $scope.post.comments.push(comment);
  //   // });
  //   // $scope.body = '';
  // };
  // $scope.incrementUpvotes = function(gpost){
  //   gposts.upvoteGroupPost(gpost);
  // };
  $scope.isLoggedIn = auth.isLoggedIn;
});

app.controller('GpostCtrl', [
'$scope',
'$stateParams',
'gposts',
'gcomments',
'auth',
function($scope, $stateParams, gposts, gcomments, auth){
  var gpost = gposts.gpost[$stateParams.id];
  $scope.get(gpost._id);
  $scope.gpost = gposts.gpost;
  $scope.gcomments = gcomments.gcomments;
  $scope.addGcomment = function(){
    if(!scope.body || $scope.body === '') { return; }
    gposts.addGcomment(gposts.gpost._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(gcomment) {
      $scope.gpost.gcomments.push(gcomment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(gcomment){
    gposts.upvoteGroupComment(gpost, gcomment);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
}]);


/*  ----------------  *
    FACTORIES - USER
 *  ----------------  */

// POSTS 
app.factory('posts', function($http, auth){
  var o = {
    posts: [],
    post: {}
  };

  o.getAll = function() {
    return $http.get('/api/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post) {
    console.log(post);

    return $http.post('/api/posts', post).success(function(data){
      o.posts.push(data);
    });

  };
  o.upvote = function(post) {
    return $http.put('/api/post/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      post.upvotes += 1;
    });
  };
  o.get = function(id) {
    return $http.get('/api/posts/' + id).then(function(data){
       console.log(data);
      return data;
    });
  };

  o.addComment = function(post, comment) {
    console.log(post, comment);
    return $http.post('/api/post/' + post._id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.upvoteComment = function(post, comment) {
    return $http.put('/api/post/' + post._id + '/comment/'+ comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes += 1;
    });
  };

  return o;
});

// COMMENTS
app.factory('comments', ['$http', 'auth', function($http, auth){
  var o = {
    comments: []
  };
  o.getAll = function() {
    return $http.get('/api/comments').success(function(data){
      angular.copy(data, o.comments);
    });
  };
  return o;
}]);  

// ITEMS

app.factory('items', ['$http', 'auth', function($http, auth){
  var o = {
    items: [],
    item: {}, 
    videos: [],
    video: {},
    books: [],
    book: {}
  };
  o.getAll = function() {
    return $http.get('/api/items').success(function(data){
      angular.copy(data, o.items);
    });
  };
  o.getAllVideos = function () {
    return $http.get('/api/videos').success(function(data){
      angular.copy(data, o.videos);
    });
  };
  o.getExercises = function(id) {
    return $http.get('/api/items/' + id + '/exercises').success(function(data){
      console.log(data);
      angular.copy(data, o.items);
    });
  };
  o.create = function(item) {
    return $http.post('/api/items', item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, item);
      o.items.push(extendedItem);
      // will be added to the appropriate service object subarray
      // based on submitted type
      o[item.type + 's'].push(extendedItem);
    });
  };
  o.newPlan = function (plan, id) {
    return $http.post('/api/workoutPlans/' + id, plan, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, plan);
      o.items.push(extendedItem);
    });
  };
  o.newStep = function (step, id) {
    return $http.post('/api/item/exercise/' + id, step, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, step);
      o.items.push(extendedItem);
    });
  };
  o.newDay = function (id, day) {
    return $http.post('/api/items/' + id + '/diet', day).success(function(data) {
      return data;
    });
  };
  // o.getDays = function() {
  //   return $http.get('/api/days/' + )
  // }
  o.get = function(item) {
    return $http.get('/api/items/' + item).then(function(res){
      return res.data;
    });
  };
  o.getExercise = function(exercise) {
    console.log(exercise);
    return $http.get('/api/item/exercise/' + exercise).then(function(res){
      return res.data;
    });
  };
  o.getStep = function(step) {
    console.log(step);
    return $http.get('/api/item/step/' + step).then(function(res){
      return res.data;
    });
  };
  o.upvote = function(item) {
    return $http.put('/api/items/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      item.upvotes += 1;
    });
  };

  o.addTransaction = function(id, transaction) {
    return $http.post('/api/items/' + id + '/transactions', transaction, {
      headers: {Authorization: 'Bearer '+transactions.getToken()}
    }).success(function(data){
      transactions.push(data);
    });
  };
  return o;
  
  // var t = function(){
  //   console.log(item.name);
  // };


  // t();
}]);


// TRANSACTIONS
app.factory('transactions', ['$http', 'auth', function($http, auth){
  var o = {
    transactions: []
  };  
  // o.getAll = function() {
  //   return $http.get('/api/transactions').success(function(data){
  //     angular.copy(data, o.transactions);
  //   });
  // };
  o.get = function(id) {
    return $http.get('/api/transactions/' + id).then(function(res){
      return res.data;
    });
  };
  o.purchase = function(card) {
    console.log(card);
    return $http.post('api/transactions', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  return o;
}]);

// CUSTOMERS

app.factory('customers', ['$http', 'auth', function($http, auth){
  var o = {
    customers: []
  };  
  o.get = function(id) {
    return $http.get('/api/customers/' + id).then(function(res){
      return res.data;
    });
  };
  return o;
}]);  


// AUTH
app.factory('auth', function($http, $window){
   var auth = {};
   auth.saveToken = function (token){
      $window.localStorage['admin-token'] = token;
    };

    auth.getToken = function (){
      return $window.localStorage['admin-token'];
    };
    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };
    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };
    auth.isThisUser = function() {
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload._id;
      }
    };
    auth.isUser = function(){
      var token = auth.getToken();

      if(token){
       var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.permissions === 'User' || 'Admin' || 'Collaborator';
      } else {
        return false;
      }
    };
    auth.isAdmin = function(){
      var token = auth.getToken();

      if(token){
       var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.permissions === 'Admin';
      } else {
        return false;
      }
    };
    auth.logOut = function(){
      $window.localStorage.removeItem('admin-token');
      $window.location = "http://localhost:3000";
    };
    auth.getUser = function (){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload;
      }
    };
  return auth;
});


// LANGUAGES
app.factory('languages', ['$http', '$window', function($http, $window){
  var lang = { languages : [] };
                       // no function parameters -- function ()
  lang.getAll = function () { 
    return $http.get('/api/languages').success(function(data){
      console.log(data); // <<-- does this print anything?
      angular.copy(data, lang.languages);
    });
  };
  lang.addLanguage = function (language) {
    console.log(language);
    return $http.post('/api/user/:id/languages', { 'name': language }).success(function(data){
      console.log(data);
      lang.languages.push(data);
    });
  }; 
  
  return lang; 
}]);

// SETTINGS

app.factory('settings', function ($http, $window) {
   var s = { settings : {} };
   s.getAll = function (){
    return $http.get('/api/settings').success(function(data){
      angular.copy(data, s.settings);
    });
   };
   s.update = function (user){
    console.log('updating user', user);
    return $http.put('/api/settings', user).success(function(data){
        s.settings = data;
      });
   };
   s.get = function (handle) {
     return $http.get('/api/user/handle/' + handle).success(function(data){
       console.log(data);
       return data;
     });
   };
   return s;
});

// USERS

app.factory('users', function ($http, $window, auth) {
  var u = { users: [], user: {} };

  u.getAll = function() {
    return $http.get('/api/users').success(function(data) {
      angular.copy(data, u.users);
    });
  };

  u.getRange = function(start, end) {
    return $http.get('/api/users/' + start + '/' + end, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  u.search = function(query) {
    return $http.get('/api/users/search/' + query).success(function(data) {
      return data;
    });
  };
  u.get = function (id) {
    return $http.get('/api/user/' + id).success(function(data){
      console.log(data);
      return data;
    });
  };
  u.update = function (user){
    console.log('updating user', user);
    return $http.put('/api/settings', user).success(function(data){
        u.users = data;
    });
  };

  u.get = function (id) {
    return $http.get('/api/user/' + id).success(function(data){
      u.user = data;
      return data;
    });
  };

  u.getAllButSelf = function() {
    var set = u.users;
    angular.forEach(set, function(user, index) {
      if (user.username === auth.currentUser()) {
        set.splice(index, 1);
      }
    });
    return set;
  };

  return u;
});


// GROUPS
app.factory('groups', ['$http', 'auth', function($http, auth){
  var o = {
    groups: [],
    group: {}
  };

  o.getAll = function() {
    return $http.get('/api/groups').success(function(data){
      console.log(data);
      angular.copy(data, o.groups);
    });
  }; 
  o.create = function (group) {
   console.log(group);
   return $http.post('/api/groups', group ).success(function(data){
     console.log(data);
     o.groups.push(data);
   });
  };
  o.get = function(id) {
    return $http.get('/api/group/' + id).then(function(data){
      console.log(data);
      return data;
    });
  };
  o.createGpost = function(group, gpost) {
    console.log(group, gpost);
    return $http.post('/api/group/' + group._id + '/gposts', gpost, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.createGcomment = function (gpost, gcomment) {
    console.log(gpost);
    console.log(gcomment);
    // return $http.post('/api/group/'+group._id+'gpost/' + gpost._id + '/gcomments', gcomment, {
    //   headers: {Authorization: 'Bearer '+auth.getToken()}
    // });
  };
  return o;
}]);


app.factory('gposts', ['$http', 'auth', function($http, auth){
  var o = {
    gposts: [],
    gpost: {}
  };

  o.getAll = function(id) {
    return $http.get('/api/group/' + id + '/gposts').success(function(data){
      console.log(data);
      angular.copy(data, o.gposts);
    });
  };

  // o.upvote = function(gpost) {
  //   return $http.put('/api/gposts/' + post._id + '/upvote', null, {
  //     headers: {Authorization: 'Bearer '+auth.getToken()}
  //   }).success(function(data){
  //     gpost.upvotes += 1;
  //   });
  // };
  // o.get = function(id) {
  //   return $http.get('/api/gposts/' + id).then(function(res){
  //     return res.data;
  //   });
  // };
  // o.addGroupComment = function(id, gcomment) {
  //   return $http.post('/api/gposts/' + id + '/gcomments', gcomment, {
  //     headers: {Authorization: 'Bearer '+auth.getToken()}
  //   });
  // };
  return o;
}]);


app.factory('gcomments', ['$http', 'auth', function($http, auth){
  var o = {
    gcomments: []
  };  
  o.getAll = function() {
    return $http.get('/api/gcomments').success(function(data){
      angular.copy(data, o.gcomments);
    });
  };
  return o;
}]); 


/*  ----------------------  *
    CONTROLLER - DIETPLAN
 *  ----------------------  */
/* 
/* ---------------------------- */
app.controller('DietCtrl', function ($scope, $attrs, Meal, Diet, Recipe, CookingStep, Ingredient) {
  var self = this;
  $scope.debug = true;

  // ---- INIT SCOPE ----  //
  this.init = function(element) {
    self.$element = element;
    $scope.diet = $scope.item || new Diet({});
  };


  $scope.meal = new Meal({});
  $scope.recipe = new Recipe({});
  $scope.initStep = function() {
    $scope.step = new CookingStep({order: $scope.recipe.steps.length});
  };
  $scope.initIngredient = function() {
    $scope.ingredient = new Ingredient({});
  };
  $scope.cancelIngredient = function() {
    $scope.ingredient = null;
  };


  $scope.showRecipe = false;

  // // ------ METHODS FOR CONVERSATIONS ------ //

  $scope.initNewRecipe = function() {
    $scope.showRecipe = true;
    $scope.recipe = new Recipe({});
  };



});

app.directive('dietPlan', function () {
  
  return {
    restrict: 'E', 
    scope: {
      item: '='
    },
    controller: 'DietCtrl',
    templateUrl: 'shop.dietplan.tpl.html',
    link: function(scope, element, attrs, DietCtrl) {
      DietCtrl.init( element );
    }
  };

});



app.factory('Meal', function() {
  var Meal = function(meal) {
    var self = this;
    self.title        = meal.title || null;
    self.type         = meal.type || null;
    self.description  = meal.description || null;
    self.day          = meal.day || 1 || null;
    self.cooktime     = meal.cooktime || null;
    self.recipes      = meal.recipes || [];
  };

  return Meal;
});

app.factory('Diet', function() {

  var Diet = function(item) {
    var self = this;
    self.title = item.title || null;
    self.price = item.price;
    self.duration = 1;
  };

  return Diet;

});

app.factory('Recipe', function() {

  var Recipe = function (recipe) {
    var self         = this;
    self.title       = recipe.title || null;
    self.type        = recipe.type || null;
    self.description = recipe.description || null;

    self.yield       = recipe.yield || null;
    self.calories    = recipe.calories || null;
    self.fats        = recipe.fats || null;
    self.carbs       = recipe.carbs || null;
    self.proteins    = recipe.proteins || null;

    self.cost        = recipe.cost || null;
    self.preptime    = recipe.preptime || null;
    self.cooktime    = recipe.cooktime || null;

    self.equipment   = recipe.equipment || [];
    self.steps       = recipe.steps || [];

    self.video       = recipe.video || null;
    self.coverphoto  = recipe.coverphoto || null;
    self.photos      = recipe.photos || [];

  };

  return Recipe;

});

app.factory('CookingStep', function() {

  var CookingStep = function() {
    this.order       = null;
    this.description = null;
    this.photo       = null;
  };
  return CookingStep;

});

app.factory('Ingredient', function() {

  var Ingredient = function() {
    this.title       = null;
    this.description = null;
    this.photo       = null;
    this.measure     = null;
    this.unit        = null;
  };

  return Ingredient;

});


/*  ----------------------  *
    CONTROLLER - MESSENGER
 *  ----------------------  */

/* $scope.conversation at the level of the controller is focused convo
/* --> user initializes new blank conversation
/* --> when a conversation is focused from list, defaults to [0]th one
/* ---------------------------- */
app.controller('MessengerCtrl', function ($scope, settings, users, messenger, messageSocket, Conversation, Message) {

  $scope.debug = true;
  // $scope.debug = false;

  // ---- INIT SCOPE ----  //

  // for selecting users to talk to
  $scope.users = users.getAllButSelf();
  // get all of user's metadata and extend scope user object
  angular.extend($scope.user, users.user);
  // set up metadata on the newmessage object
  $scope.newmessage = new Message($scope.user);

  // get all conversations
  $scope.conversations = messenger.conversations || [];
  $scope.map = messenger.map || {};

  if ($scope.conversations.length > 0) {
    setFocus($scope.conversations[0]);
  } 

  // ------ METHODS FOR CONVERSATIONS ------ //

  // Set the focus on a particular conversation
  // establishes the conversation._id in the newmessage
  // marks read timestamps for messages
  $scope.focusConversation = setFocus;

  function setFocus(convo) {
    $scope.mainConversation = convo;
    $scope.newmessage.conversation = convo._id;
    if (convo._id) {
      getMessages(convo);
      messenger.readMessages(convo);
    }
  }

$scope.print = function(string) {
  console.log(string);
};
  // Starting a new conversation
  $scope.initConversation = function() {
    // only init a new convo if not already in that mode
    if (!$scope.mainConversation || !$scope.mainConversation.new) {
      $scope.addUserModal = true;
      $scope.copyOfUsers = angular.copy($scope.users, $scope.copyOfUsers);
      $scope.conversations.unshift(new Conversation());
      $scope.focusConversation($scope.conversations[0]);
      $scope.mainConversation.users.push($scope.user);
    } 
  };

  // Cancelling a new conversation
  $scope.cancelNewConversation = function() {
    $scope.conversations.splice(0, 1);
    $scope.focusConversation($scope.conversations[0]);
  };

  // ----- ADDRESSING USERS in a new conversation ----- //
  // Looking for Users to add to conversation
  $scope.searchUsers = function() {
    users.search($scope.conversation.userQuery).success(function(data) {
      $scope.conversation.userResult = data;
    });
  };

  // Adding a user to a conversation
  $scope.addToConversation = function(user) {
    $scope.mainConversation.users.push(user);
    angular.forEach($scope.copyOfUsers, function(u, i) {
      if (u._id === user._id) { $scope.copyOfUsers.splice(i, 1); }
    });
  };

  // ----- SENDING MESSAGES in the focused main conversation ---- //
  $scope.sendMessage = function() {
    if ($scope.mainConversation.users.length < 2) {
      console.log('need a user to message with besides yourself!');
      return;
    }
    if (!$scope.mainConversation._id) {
      messenger.createConversation($scope.mainConversation).success(function(data) {
        $scope.mainConversation._id = data._id;
        $scope.addUserModal = false;
        postMessage();
      });
    } else {
      postMessage();
    }
  };
  
  function postMessage () {
    messenger.postMessage($scope.mainConversation, $scope.newmessage).success(function() {
      $scope.newmessage.body = null;
    });
  }

  // ----- RECEIVING MESSAGES in realtime via socket.io ----- //
  $scope.$on('socket:newmessage', function (event, data) {
    console.log('got a new message', event.name, data);
    if (!data.payload) return;
    $scope.$apply(function() { update(data.payload); });
  });


  function update (latest) {
    console.log('a new message for conversation ' + latest.convo_id);
    // have to find the place in convo list to update
    for (var i=0; i<$scope.conversations.length; i++) {
      if ($scope.conversations[i]._id === latest.convo_id) {
        $scope.conversations[i].latest = latest;

        if ($scope.mainConversation._id === $scope.conversations[i]._id) {
          getMessages($scope.mainConversation);
        }
        break;
      }
    }
  }



  // ----- HELPER FUNTIONS ----- //
  function getMessages (convo) { 
    messenger.get(convo._id).success(function(data) {
      convo.messages = data;
    });
  }

  $scope.isSelf = function(user_id) { return user_id === $scope.user._id; };

  $scope.otherPeople = function(conversation) {
    var others = angular.copy(conversation.users, others);
    angular.forEach(others, function(user, i) {
      if ($scope.isSelf(user._id)) {
        others.splice(i, 1);
      }
    });
    angular.forEach(others, function(user, i) {
      others[i] = user.f_name + ' ' + user.l_name;
    });
    return others.join(', ');
  };


});


app.directive('conversationAddUsers', function() {
  return {
    restrict: 'E',
    controller: 'MessengerCtrl',
    scope: false,
    template: '<div class="col-sm-12">' +
                // '<form name="userSearchForm" class="form-horizontal" ng-submit="findUsers()" novalidate/>' +
                  // '<div class="form-group">' + 
                    // '<input type="text" class="form-control" placeholder="Search" ng-model="conversation.userQuery" ng-blur="searchUsers()">' +
                  // '</div>' +
                // '</form>' +
                '<div ng-repeat="user in users | orderBy:\'username\'" ng-click="addToConversation(user)">' +
                  '<i class="fa fa-plus"></i> {{user.handle || user.username}} {{user.f_name + \' \' + user.l_name}}' +
                '</div>' +
                '<div class="col-sm-12" ng-repeat="user in conversation.userResult">' +
                  '<div class="col-sm-1">Pic</div>' +
                  '<div class="col-sm-10">{{user.handle}} | {{user.f_name}} {{user.l_name}}</div>' +
                  '<div class="col-sm-1"> </div>' +
                '</div>' +
              '</div>',
    link: function(scope, element, attrs) {}

  };
});



app.directive('messageBox', function() {
  return {
    restrict: 'EA',
    // template: '<textarea style="width: 100%; height: 200px" ng-disable="true" ng-model="messageLog"></textarea>',
    controller: function($scope, $element) {
      $scope.$watch('messageLog', function() {
        var textArea = $element[0].children[0];
        textArea.scrollTop = textArea.scrollHeight;
      });
    }
  };
});




app.directive('scrollBottom', function () {
  return {
    scope: {
      scrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
});

app.factory('messenger', function ($http, auth) {

  var o = {
    conversations: [],
    map: {}
  };

  o.getAll = function() {
    return $http.get('/api/conversations', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      angular.copy(data, o.conversations);
      angular.forEach(data, function(convo) {
        o.map[convo._id] = convo;
      });
    });
  };

  o.get = function(id) {
    return $http.get('/api/conversation/' + id).success(function(data) {
      return data;
    });
  };

  o.createConversation = function(convo) {
    return $http.post('/api/conversation', convo, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      console.log('create convo data', data);
      return data;
    });
  };

  o.postMessage = function(convo, message) {
    return $http.post('/api/conversation/' + convo._id + '/messages', message, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      return data;
    });
  };

  o.readMessages = function(convo) {
    return $http.put('/api/conversation/' + convo._id + '/read', { user_id: auth.getUser()._id }, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  return o;

});

app.factory('Conversation', function() {

  var Conversation = function () {
    var self = this;
    self.users = [];
    self.messages = [];
    self.new = true;
  };

  return Conversation;

});

app.factory('Message', function() {
  var Message = function(user) {
    var self = this;
    self.user = user._id || null;
    self.f_name = user.f_name || null;
    self.l_name = user.l_name || null;
    self.handle = user.handle || null;
  };

  return Message;

});


app.factory('messageSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('tokenrequest');
  socket.forward('broadcast');
  socket.forward('conversations');
  socket.forward('newmessage');
  
  return socket;
});