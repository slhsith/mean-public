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

    return $http.post('/api/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
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

app.factory('items', function($http, auth){

  var o = {
    items: [],
    item: {}, 
    videos: [],
    video: {},
    books: [],
    book: {}
  };

  var _typePopulate = {
    dietplan: function(item) {
      console.log('dietplan._id', item.dietplan);
      return $http.get('/api/item/dietplan/' + item.dietplan, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    },
    workoutplan: function(item) {
      return $http.get('/api/item/workoutplan/' + item.workoutplan, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    }
  };

  // CREATE
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
      return data;
    });
  };

  // READ - basic getting of data
  o.getAll = function() {
    return $http.get('/api/items').success(function(data){
      angular.copy(data, o.items);
    });
  };
  o.get = function(item_id) {
    return $http.get('/api/item/' + item_id).then(function(res){
      var item = res.data;
      var subitem = item[item.type];
      for (var k in subitem) {
        if (subitem.hasOwnProperty(k) && subitem[k] !== subitem._id) {
          console.log(subitem[k]);
          item[k] = subitem[k];
          item[item.type] = subitem._id;
        }
      }
      return item;
    });
  };

  o.populate = function(item) {
    console.log('populate ' + item.type, item);
    return _typePopulate[item.type](item);
  };

  o.getAllVideos = function () {
    return $http.get('/api/videos').success(function(data){
      angular.copy(data, o.videos);
    });
  };

  // UPDATE

  // API hits specific to item type
  o.update = function(item) {
    // e.g. PUT diet @ /api/item/dietplan/dietplan_id, 
    return $http.put('/api/item/' + item.type + '/' + item[item.type], item, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
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
  o.getExercise = function(exercise) {
    console.log(exercise);
    return $http.get('/api/item/exercise/' + exercise).then(function(res){
      return res.data;
    });
  };
  o.getExercises = function(id) {
    return $http.get('/api/items/' + id + '/exercises').success(function(data){
      console.log(data);
      angular.copy(data, o.items);
    });
  };
  o.getStep = function(step) {
    console.log(step);
    return $http.get('/api/item/step/' + step).then(function(res){
      return res.data;
    });
  };


  // DELETE
  //  ...

  return o;
  

});


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
   s.uploadAvatar = function (user){
       
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
  o.createGpost = function(gpost, id) {
    console.log(gpost, id);
    return $http.post('/api/group/' + id + '/gposts', gpost, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.createGcomment = function (gpost_id, gcomment) {
    console.log('gpost_id in factory', gpost_id);
    console.log('gcomment in factory', gcomment);
    return $http.post('/api/gpost/' + gpost_id + '/gcomments', gcomment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
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

