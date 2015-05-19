app.controller('MainCtrl', function ($scope, users, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
});

app.controller('UserCtrl', function ($scope, users, auth, usersPromise) {
  $scope.user = usersPromise.data;
  console.log(usersPromise);
  $scope.update = function() {
    console.log($scope.user);
    users.update($scope.user);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings: Update User");
  };
});

app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);