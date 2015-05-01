app.factory('verification', function ($http, $window) {
  return {
      getUser: function getUserMethod(user, name, token) {
          return $http.get('/resetPassword/'+ name + '/' + token).success(function (data) {
            return data;
          });
      },
      emailVerify: function emailVerifyMethod(user, name, token) {
          return $http.put('/api/emailverify/'+ name + '/' + token).success(function (data) {
          });
      },
      updatePassword: function updatePasswordMethod(user, name, token, password) {
          return $http.put('/api/resetPassword/'+ name + '/' + token).success(function (data) {
            console.log('Success!');
          });
      }
  };
});