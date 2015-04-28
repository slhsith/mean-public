app.controller('MainCtrl', ['$scope', 'auth', '$location', function ($scope, auth) {
  $scope.verifyEmail = function() {
    confirmEmail.confirm($scope.verify).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

  $scope.resetPassword = function() {
    confirmEmail.confirm($scope.verify).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);