app.factory('confirmEmail',['$http', '$window', function ($http, $window) {
  var confirmEmail = {};
  confirmEmail.confirm = function (user) {
    return $http.put('/api/emailverify/:username/:token').success(function (data) {
    });
  };
  return confirmEmail;
}]);

app.factory('resetPassword',['$hhtp','$window', function ($http, $window) {
  var resetPassword = {};
  resetPassword.reset = function (user) {
    return $http.put('/api/resetPassword/:email/:token').success(function (data) {
    });
  };
  return resetPassword;
}]);