app.controller('TransCtrl', function ($scope, items, auth, transactions, itemPromise) {
  $scope.item = itemPromise.data;

  $scope.startTrans = function () {
    console.log($scope.item);
    transactions.purchase($scope.item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Start Transaction",{"area":"shop", "page":"transactions", "action":"transaction"});
    // mixpanel.track("Checkout: Purchase Item");
    // mixpanel.people.track_charge(10,{  item: $scope.item.name, type: $scope.item.type, "$time": new Date() });
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isContributor = auth.isContributor;
  $scope.isUser = auth.isUser;
});


app.controller('SettingsCtrl', function ($scope, languages, settings, userPromise, auth) {
  $scope.user = angular.extend($scope.user, settings.settings);
  $scope.languages = languages.languages;
  $scope.addLanguage = function(){
    console.log($scope.language.name);
    languages.addLanguage($scope.language.name).success(function(data) {
    $scope.languages.push(data);
    });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Languange",{"area":"settings", "page":"settings", "action":"add"});
  };

  $scope.updateSettings = function() {
    console.log($scope.user);
    settings.update($scope.user);
    if ($scope.user.avatar.length) {
      settings.uploadAvatar($scope.user);
    }
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings update",{"area":"settings", "page":"settings", "action":"update"});
    // mixpanel.track("Settings: Update User");
  };
  $scope.user = userPromise;
  $scope.isAdmin = auth.isAdmin;
  $scope.isContributor = auth.isContributor;
  $scope.isUser = auth.isUser;
  $scope.isThisUser = auth.isThisUser;
});

