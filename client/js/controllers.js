app.controller('MainCtrl', ['$scope', 'auth', '$location', function ($scope, auth) {
  $scope.user = {};
  $scope.register = function () {
    auth.register($scope.user).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
    mixpanel.track("HomePage: Register");
  };

  $scope.logIn = function () {
    auth.logIn($scope.login).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
    mixpanel.track("HomePage: Login");
  };

  $scope.forgotPassword = function () {
    auth.forgotPassword($scope.forgot).error(function (error) {
      console.log($scope.forgot);
      $scope.error = error;
    });
    mixpanel.track("HomePage: Reset Password, Submit Email");
  };

  // $scope.verifyEmail = function() {
  //   confirmEmail.confirm($scope.verify).error(function (error) {
  //     $scope.error = error;
  //     $scope.showSuccessAlert = true;
  //   }).then(function () {
  //     window.location = "http://localhost:3000/user/#/home";
  //   });
  // };

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);