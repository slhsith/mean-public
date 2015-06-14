/*  ------------------------------------  *
    FACTORIES - USER APP GLOBAL SERVICES
 *  ------------------------------------  */

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
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.getUser = function (){
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload;
    }
  };

  auth.currentUser = function(){
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    }
  };

  auth.isThisUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload._id;
    }
  };

  auth.isUser = function(){
    var token = auth.getToken();
    if (token) {
     var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.permissions === 'User' || 'Contributor' || 'Admin';
    } else {
      return false;
    }
  };

  auth.isContributor = function () {
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.permissions === 'Contributor' || 'Admin';
    } else {
      return false;
    }
  };

  auth.isAdmin = function(){
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.permissions === 'Admin';
    } else {
      return false;
    }
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('admin-token');
    $window.location = "/";
  };

  auth.header = function() {
    return { headers: { Authorization: 'Bearer ' + auth.getToken() } };
  };

  return auth;
});

// POSTS 
app.factory('posts', function($http, auth){
  var o = {
    posts: [],
    post: {}
  };

  o.getAll = function() {
    return $http.get('/api/posts').then(function(res){
      angular.copy(res.data, o.posts);
    });
  };

  o.create = function(post) {
    console.log(post);
    return $http.post('/api/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      o.posts.push(res.data);
    });
  };

  o.upvote = function(post) {
    return $http.put('/api/post/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      post.upvotes += 1;
    });
  };

  o.get = function(id) {
    return $http.get('/api/post/' + id).then(function(res){
      console.log(res.data);
      return res.data;
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
    }).then(function(res){
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



// USERS
app.factory('users', function ($http, $window, auth) {
  var u = { users: [], user: {} };

  u.getAll = function() {
    return $http.get('/api/users').then(function(res) {
      angular.copy(res.data, u.users);
    });
  };

  u.getRange = function(start, end) {
    return $http.get('/api/users/' + start + '/' + end, {
     headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  u.search = function(query) {
    return $http.get('/api/users/search/' + query).then(function(res) {
      return res.data;
    });
  };

  u.get = function (id) {
    return $http.get('/api/user/' + id).then(function(res){
      console.log('user get', res.data);
      return res.data;
    });
  };

  u.update = function (user){
    console.log('updating user', user);
    return $http.put('/api/settings', user).then(function(res){
      // u.users = res.data;
      return res.data;
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

  u.isCreator = function(thing) {
    return thing.creator._id === auth.isThisUser();
  };

  return u;
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
