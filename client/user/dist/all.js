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
        item: ['$stateParams', 'items', function($stateParams, items) {
          return items.get($stateParams.id);
        }]
      }
    })
    .state('shop', {
      url: '/shop',
      templateUrl: 'shop.html',
      controller: 'MainCtrl',
      resolve: {
        itemPromise: ['items', function(items){
          return items.getAll();
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
app.controller('MainCtrl', [
'$scope',
'posts',
'items',
'auth',
function($scope, posts, items, auth){
  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  };
  $scope.items = items.items;
  $scope.addItem = function(){
    if(!$scope.title || $scope.title === '') { return; }
    item.create({
      name: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
'auth',
function($scope, posts, post, auth){
  $scope.posts = posts.posts;
  $scope.post = post;
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    posts.addComment(post._id, {
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
}]);

app.controller('ItemsCtrl', [
'$scope',
'items',
'item',
'auth',
function($scope, items, item, auth){
  $scope.items = items.items;
  $scope.item = item;
  $scope.incrementUpvotes = function(comment){
    items.upvoteItem(item);
  };
}]);

app.controller('NavCtrl', [
'$scope',
'auth',
'$location',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);

app.controller('SettingsCtrl', [
'$scope',
'settings',
function($scope, settings){
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
    settings.test($scope.language.name);
    settings.addLang($scope.language.name);
  };
}]);

app.factory('posts', ['$http', 'auth', function($http, auth){
  var o = {
    posts: []
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

app.factory('items', ['$http', 'auth', function($http, auth){
  var o = {
    items: []
  };
  o.getAll = function() {
    return $http.get('/api/items').success(function(data){
      angular.copy(data, o.items);
    });
  };
  o.create = function(item) {
    return $http.post('/api/items', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.items.push(data);
    });
  };
  o.upvote = function(item) {
    return $http.put('/api/items/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      item.upvotes += 1;
    });
  };
  o.get = function(id) {
    return $http.get('/api/items/' + id).then(function(res){
      return res.data;
    });
  };
  return o;
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
  return auth;
}]);

app.factory('settings', ['$http', '$window', function($http, $window){
    var o ={
      settings:[]
    };
    o.test = function (language) {
      console.log(language);
    };
    o.addLang = function(language){
      return $http.post('/api/settings/languages').success(function(data){
        o.settings.push(data);
      });
    };
  return o;
}]);