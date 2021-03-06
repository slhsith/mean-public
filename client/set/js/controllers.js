/*  -----------------  *
    CONTROLLERS - SET
 *  -----------------  */
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
  $scope.submitPassword = function() {
    $scope.user.username = $state.params.username;
    $scope.user.user_token = $state.params.user_token;
    verification.updatePassword($scope.user).success(function () {
      // redirect home
      console.log('Redirecting to user app');
      window.location = '/';
    }).error(function (error) {
      $scope.error = error;
    });
  }; 
});

app.controller('SearchCtrl', function ($scope, search, searchPromise) {
  $scope.users = searchPromise.data;
  console.log(searchPromise);
  $scope.submitSearch = function (data) {
    console.log($scope.search);
    search.get($scope.search);
    $scope.users.push(data);
  };
});



app.controller('MapCtrl', function ($scope) {
  var mapOptions = {};
  var map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);
  var events = {
    places_changed: function (searchBox) {}
  };
  $scope.map = { 
    center: { latitude: 45, longitude: -99 }, 
    zoom: 8,
    options: {scrollwheel: false},
    searchbox: { template:'searchbox.tpl.html', events:events}
  };
});


app.controller('UserCtrl', function ($scope, users, $stateParams, userPromise, auth) {
  $scope.user = userPromise.data;
  console.log(userPromise);
  $scope.followUser = function () {
    users.addFollower($stateParams.handle);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isFollowing = auth.isFollowing;
});

app.controller('ItemCtrl', function ($scope, items, itemPromise, auth) {
  $scope.item = itemPromise.data;
});

