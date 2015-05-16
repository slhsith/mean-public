app.factory('verification', function ($http, $window) {
  return {
      getUser: function getUserMethod(user, name, token) {
          return $http.get('/resetpassword/'+ name + '/' + token)
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
      updatePassword: function updatePasswordMethod(user, name, token, password) {
          return $http.put('/api/resetpassword/'+ name + '/' + token).success(function (data) {
            console.log('Success!');
          });
      }
  };
});

app.factory('search', function ($http) {
  var u = {
    users: []
  };
  u.get = function (query) {
    return $http.get('/api/search/' + query).success(function(data){
      console.log(data);
      return data;
    });
  };
  return u;
});

app.factory('users',['$http', '$window', function($http, $window){
  var u = {
    users: []
  };
  u.get = function (handle) {
    return $http.get('/api/user/handle/' + handle).success(function(data){
      console.log(data);
      return data;
    });
  };
  return u;
}]);