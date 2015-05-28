app.controller('MainCtrl', function ($scope, auth) {

  $scope.user = {};

  $scope.register = function () {
    auth.register($scope.user).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
    mixpanel.track("User Register",{"area":"home", "page":"home", "action":"register"});
    // mixpanel.track("HomePage: Register");
  };

  $scope.logIn = function () {
    auth.logIn($scope.login).error(function (error) {
      $scope.error = error;
    }).then(function () {
      window.location = "http://localhost:3000/user/#/home";
    });
    mixpanel.track("User Log-in",{"area":"home", "page":"home", "action":"log-in"});
    // mixpanel.track("HomePage: Login");
  };

  $scope.forgotPassword = function () {
    auth.forgotPassword($scope.forgot)
    .success(function(data) {
      $scope.forgot = {};
      $scope.success = true;
      console.log(data.message);
    }).error(function (error) {
      $scope.error = error;
    });
    mixpanel.track("User Reset Password",{"area":"home", "page":"home", "action":"resetPassword"});
    // mixpanel.track("HomePage: Reset Password, Submit Email");
  };

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  $scope.checkLoginState = function() {
    auth.facebook(user._id);
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  // $scope.getMyLastName = function () {
  //  facebookService.getMyLastName() 
  //    .then(function(response) {
  //      $scope.last_name = response.user.l_name;
  //    });
  //  };

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

});

