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
app.controller('ResetCtrl', ['$scope', '$location','resetPassword', function ($scope) {
  $scope.submitPassword = function(user, username, user_token) {
    console.log(user);
    console.log(username);
    console.log(user_token);
    updatePassword($scope.user).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    });
  }; 
}]);