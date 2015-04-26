var app = angular.module('mainApp', ['templates']);
app.controller('MainCtrl', ['$scope', 'auth', '$location', function ($scope, auth) {
  $scope.user = {};
  $scope.register = function () {
    auth.register($scope.user).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

  $scope.logIn = function () {
    auth.logIn($scope.login).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

  $scope.forgot = function () {
    auth.forgot($scope.forgot).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);
app.factory('auth', ['$http', '$window', function ($http, $window) {
  var auth = {};
  auth.saveToken = function (token) {
    $window.localStorage['admin-token'] = token;
  };

  auth.getToken = function () {
    return $window.localStorage['admin-token'];
  };
  auth.isLoggedIn = function () {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  auth.currentUser = function () {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };
  auth.register = function (user) {
    return $http.post('/api/register', user).success(function (data) {
      auth.saveToken(data.token);
    });
  };
  auth.logIn = function (user) {
    return $http.post('/api/login', user).success(function (data) {
      auth.saveToken(data.token);
    });
  };
  auth.logOut = function () {
    $window.localStorage.removeItem('admin-token');
  };
  auth.forgot = function (user) {
    return $http.post('/api/forgot', user).success(function (data) {
      auth.saveToken(data.token);
    });
  };
  return auth;
}]);