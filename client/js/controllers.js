app.controller('MainCtrl', ['$scope', 'auth', '$location', function ($scope, auth, $location) {
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
    }).then(function (){
      window.location = "http://localhost:3000/";
    });
  };

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);