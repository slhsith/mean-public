app.controller('MainCtrl', function ($scope, users, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.users = users.users;
});

app.controller('UserCtrl', function ($scope, users, auth, userPromise) {
  $scope.user = userPromise.data;
  $scope.isAdmin = auth.isAdmin;
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
  $scope.isAdmin = auth.isAdmin;
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);