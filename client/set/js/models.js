// app.factory('confirmEmail',['$http', '$window', function ($http, $window) {
//   var confirmEmail = {};
//   confirmEmail.confirm = function (user) {
//     return $http.put('/api/emailverify/:username/:token').success(function (data) {
//     });
//   };
//   return confirmEmail;
// }]);

app.factory('resetPassword',['$http','$window', function ($http, $window) {
  var resetPassword = {};
  resetPassword.reset = function (user) {
    return $http.get('/resetPassword/'+ user.username + '/' + user.user_token).success(function (data) {
      return data;
    });
  };
  updatePassword  = function (user, req) {
    return $http.put('/api/resetPassword/'+ user.username + '/' + user.user_token).success(function (data) {
      user.password = req.body.password;
      console.log('Success!');
    });
  };
  return resetPassword;
}]);