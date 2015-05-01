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
app.controller('ResetCtrl', ['$scope', '$location','$state', '$stateParams', 'resetPassword', function ($scope, $state, $stateParams, reset) {
  $scope.submitPassword = function() {
    console.log($stateParams.params.username);
    console.log($stateParams.params.token);
    console.log($scope.user.password);
    // console.log($stateParams.username);
    // console.log($stateParams.token);
    reset.resetPassword.updatePassword(user, $stateParams.params.username, $stateParams.params.token)
      .success(function () {
      // output message
      // redirect them home
      });
    // .error(function (error) {
    //   $scope.error = error;
    //   $scope.showSuccessAlert = true;
    // });
  }; 
}]);