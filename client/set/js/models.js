/*  ---------------  *
    FACTORIES - SET
 *  ---------------  */
 
 app.factory('verification', function ($http, $window) {
  return {
      getUser: function getUserMethod(username, user_token) {
          return $http.get('/api/resetpassword/' + username + '/' + user_token)
          .success(function (data) {
            return data;
          });
      },
      emailVerify: function emailVerifyMethod(username, user_token) {
          return $http.put('/api/emailverify/' + username + '/' + user_token)
          .success(function (data) {
            console.log(data.message);
          });
      },
      updatePassword: function updatePasswordMethod(user) {
        return $http.put('/api/resetpassword/'+ user.username + '/' + user.user_token, user)
        .success(function (data) {
          console.log('Success!');
        });
      }
  };
});

// app.factory('search', function ($http) {
//   var u = {
//     users: []
//   };
//   u.get = function (query) {
//     return $http.get('/api/search/' + query).success(function(data){
//       console.log(data);
//       return data;
//     });
//   };
//   return u;
// });

app.factory('users', function ($http, $window) {
  var u = {
    users: []
  };
  u.get = function (handle) {
    return $http.get('/api/user/handle/' + handle).success(function(data){
      // console.log(data);
      return data;
    });
  };
  u.addFollower = function (id, user) {
    return $http.post('/api/user/'+ id + '/followers', user).success(function(data){
      return data;
    });
  };
  return u;
});
app.factory('items', function ($http, $window) {
  var i = {
    items:[]
  };
  i.get = function (item) {
    return $http.get('/api/item/' + item).then(function(res){
      return res;
    });
  };
  return i;
}); 

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