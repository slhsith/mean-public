// app.factory('confirmEmail',['$http', '$window', function ($http, $window) {
//   var confirmEmail = {};
//   confirmEmail.confirm = function (user) {
//     return $http.put('/api/emailverify/:username/:token').success(function (data) {
//     });
//   };
//   return confirmEmail;
// }]);

app.factory('resetPassword',['$http','$window', function ($http, $window) {
  var o = {};
  o.reset = function (user, name, token) {
    return $http.get('/resetPassword/'+ name + '/' + token).success(function (data) {
      return data;
    });
  };
  o.updatePassword  = function (user, name, token) {
    return $http.put('/api/resetPassword/'+ name + '/' + token).success(function (data) {
      user.password = req.body.password;
      console.log('Success!');
    });
  };
  return o;
}]);