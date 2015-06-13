app.controller('ShopCtrl', function ($scope, items, Item, users, auth, popupService) {

  $scope.isMine        = users.isCreator;
  $scope.items         = items.items;
  $scope.itemTitles = items.titles;

  $scope.item = new Item();
  // Initialize a brand new item from Item constructor
  $scope.initItem = function(type) {
    $scope.item = new Item(type);
  };

  // POST new item OR PUT changes to item
  // ultimate save button is in the directive that handles the item type
  $scope.saveItem = function(item) {
    items.save($scope.item).then(function(data) {
      // if this was new, we push on array
      $scope.item = data;
      $scope.items = items.items;
      // mixpanel.alias($scope.user._id);
      mixpanel.identify($scope.user._id);
      mixpanel.track("Add Item",{"area":"shop", "page":"shop", "action":"create"});
     // mixpanel.track("Shop Page: Added Item");
    }, function(err) {
    // deal with error for user in some way`
    });
  };

  // PUT UPDATES - 

  // Initialize the edit state -- 
  $scope.editItem = function(item) {
    $scope.item = item;
  };

  $scope.deleteItem = function (item, index) {
    console.log('delete', item._id);
    if (popupService.showPopup('Are you sure you want to delete this item?')) {
      items.delete(item._id).then(function(data){
        console.log(data.message);
        $scope.items.splice(index, 1);
      });
    }
  };

  // for upvoting
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Shop Page: Upvoted Comment");
  };  


});
