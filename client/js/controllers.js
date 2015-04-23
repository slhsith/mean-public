app.controller('MainCtrl', ['$scope', 'auth', '$location', function ($scope, auth, $location) {
  $scope.user = {};
  $scope.register = function () {
    if($scope.username === $scope.repeat_username && $scope.password === $scope.repeat_password){
      auth.register($scope.user).error(function (error) {
        $scope.error = error;
      }).then(function () {
        window.location = "http://localhost:3000/user/#/home";
      });
    } else {
      return res.status(401).json({message: 'Incorrect email/password'});
    }
    
  };

  $scope.logIn = function () {
    auth.logIn($scope.login).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
  };

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);