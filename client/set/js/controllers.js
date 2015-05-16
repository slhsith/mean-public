app.controller('MainCtrl', function ($scope) {
  // $scope.verifyEmail = function() {
  //   confirmEmail.confirm($scope.verify).error(function (error) {
  //     $scope.error = error;
  //     $scope.showSuccessAlert = true;
  //   }).then(function () {
  //     window.location = "http://localhost:3000/user/#/home";
  //   });
  // };
  // console.log('Redirecting to user app');
  // window.location = 'http://localhost:3000/user/#/home';
});

app.controller('ResetCtrl', function ($scope, $state, verification) {
  $scope.submitPassword = function(user) {
    console.log($state.params.username);
    console.log($state.params.token);
    console.log($scope.user.password);
    console.log($scope.user.repeat_password);
    verification.updatePassword(user, $state.params.username, $state.params.token, $scope.user.password).success(function () {
      // redirect home
      
    }).error(function (error) {
      $scope.error = error;
      $scope.showSuccessAlert = true;
    });
  }; 
});

app.controller('SearchCtrl', function ($scope, search) {
  $scope.submitSearch = function (data) {
    console.log($scope.search.query);
    search.get($scope.search.query);
    $scope.languages.push(data);
  };
});

app.controller('UserCtrl', function ($scope, users, userPromise) {
  $scope.user = userPromise.data;
  console.log(userPromise);
});