app.controller('MainCtrl', function ($scope, users, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.users = users.users;
});

app.controller('UserCtrl', function ($scope, users, auth, userPromise, popupService) {
  $scope.user = userPromise.data;
  $scope.isAdmin = auth.isAdmin;
  $scope.update = function() {
    console.log($scope.user);
    users.update($scope.user);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings: Update User");
  };
  $scope.deleteUser = function () {
    console.log('delete', $scope.user._id);
    if (popupService.showPopup('Are you sure you want to delete this user?')) {
      users.delete($scope.user._id).success(function(data){
        console.log(data.message);
        $state.go('home');
      });
    }
  };
});

app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isAdmin = auth.isAdmin;
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);