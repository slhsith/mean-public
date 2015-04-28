app.controller('MainCtrl', ['$scope', '$location', function ($scope) {
  $scope.verifyEmail = function() {
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
app.controller('ResetCtrl', ['$scope', '$location', function ($scope) {
  $scope.resetPassword = function() {
    resetPassword.reset($scope.verify).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };
}])