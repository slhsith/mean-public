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
app.controller('MainCtrl', function($scope, auth){

  
    $scope.user = auth.getUser();
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
});

app.controller('DashCtrl', [
'$scope',
'posts',
'auth',
function($scope, posts, auth){

  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
    mixpanel.identify($scope.user._id);
    mixpanel.track("User Dashboard: Add Post");
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
    mixpanel.identify($scope.user._id);
    mixpanel.track("User Dashboard: Upvoted Comment");
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
'comments',
'auth',
function($scope, $stateParams, posts, comments, auth){
  var post = posts.post[$stateParams.id];
  $scope.getPost(post_id);
  $scope.post = posts.post;
  $scope.comments = comments.comments;
  $scope.addComment = function(){
    if(!scope.body || $scope.body === '') { return; }
    posts.addComment(posts.post._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post, comment);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('ShopCtrl', [
'$scope',
'items',
'auth',
function($scope, items, auth, item){
  $scope.items = items.items;
  $scope.addItem = function() {
   items.create($scope.item).success(function(data){
       console.log('success');
       $scope.items.push( angular.extend($scope.item, data) );
       console.log(data);
   }).error(function(){
       console.log('failure');
   });
   mixpanel.identify($scope.user._id);
   mixpanel.track("Shop Page: Added Item");
 };
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Shop Page: Upvoted Comment");
  };  
  // $scope.isLoggedIn = auth.isLoggedIn;
}]);


app.controller('ItemsCtrl', [
'$scope',
'items',
'item',
'auth',
function($scope, items, item, videos, video, auth){
  $scope.items = items.items;
  $scope.videos = videos.videos;
  $scope.video = video;
  $scope.item = item;
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Items Page: Upvoted Comment");
  };
  // $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('NavCtrl', [
'$scope',
'auth',
'$location',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.home = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);

app.controller('TransCtrl', [
'$scope',
'items',
'item',
'auth',
'transactions',
function($scope, items, item, auth, transactions){
  $scope.startTrans = function () {
    console.log($scope.card);
    transactions.purchase($scope.card);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Checkout: Purchase Item");
    // mixpanel.people.track_charge(10,{  item: $scope.item.name, type: $scope.item.type, "$time": new Date() });
  };
}]);


app.controller('SettingsCtrl', [
'$scope',
'languages',
'settings',
function($scope, languages, settings){
  $scope.myImage='';
  $scope.myCroppedImage='';
  var handleFileSelect=function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage=evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  $scope.addLanguage = function(){
    console.log($scope.language.name);
    languages.addLanguage($scope.language.name);
  };
  $scope.updateSettings = function() {
    settings.update($scope.setting);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings: Update User");
  };
}]);

app.factory('posts', ['$http', 'auth', function($http, auth){
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
    return $http.post('/api/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.posts.push(data);
    });

  };
  o.upvote = function(post) {
    return $http.put('/api/posts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      post.upvotes += 1;
    });
  };
  o.get = function(id) {
    return $http.get('/api/posts/' + id).then(function(res){
      return res.data;
    });
  };
  o.addComment = function(id, comment) {
    return $http.post('/api/posts/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.upvoteComment = function(post, comment) {
    return $http.put('/api/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes += 1;
    });
  };
  return o;
}]);


app.factory('comments', ['$http', 'auth', function($http, auth){
  var o = {
    comments: []
  };
  o.getAll = function() {
    return $http.get('/api/comments').success(function(data){
      angular.copy(data, o.items);
    });
  };
}]);  


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
  o.create = function(item) {
    return $http.post('/api/items', item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.items.push(data);
    });
  };
  o.get = function(id) {
    return $http.get('/api/items/' + id).then(function(res){
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

app.factory('customers', ['$http', 'auth', function($http, auth){
  var o = {
    customers: []
  };  
  o.get = function(id) {
    return $http.get('/api/customers/' + id).then(function(res){
      return res.data;
    });
  };
}]);  


app.factory('auth', ['$http', '$window', function($http, $window){
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
}]);

app.factory('languages', ['$http', '$window', function($http, $window){
  return {
    getLanguages: function getLangs(language) {
      return $http.get('/api/settings/languages').success(function(data){
        angular.copy(data, o.languages);
      });
    },
    addLanguage: function addLang(language) {
      console.log(language);
      return $http.post('/api/settings/languages').success(function(data){
        o.languages.push(data);
        console.log('Success!');
      });
    }
  };
}]);
app.factory('settings', ['$http', '$window', function($http, $window){
  return {
    test: function test(setting){
      console.log(setting);
    },
    getSettings: function getSettings() {
      return $http.get('/api/settings/', {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        angular.copy(data, o.items);
      });
    },
    update: function update(){
      return $http.put('/api/settings/').success(function(data){
        o.settings.push(data);
      });
    }
  };
}]);