app.controller('MainCtrl', ['$scope', '$location', function ($scope) {
  // $scope.verifyEmail = function() {
  //   confirmEmail.confirm($scope.verify).error(function (error) {
  //     $scope.error = error;
  //     $scope.showSuccessAlert = true;
  //   }).then(function () {
  //     window.location = "http://localhost:3000/user/#/home";
  //   });
  // };

}]);
app.controller('ResetCtrl', function ($scope, $state, $stateParams, verification) {
  $scope.submitPassword = function() {
    console.log($stateParams.params.username);
    console.log($stateParams.params.token);
    console.log($scope.user.password);
    verification.updatePassword(user, $stateParams.params.username, $stateParams.params.token).success(function () {
      // redirect home
      //
    }).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    });
  }; 
});