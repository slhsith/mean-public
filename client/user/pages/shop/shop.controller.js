app.controller('ShopCtrl', function ($scope, items, Item, auth, popupService) {

  $scope.isAdmin       = auth.isAdmin;
  $scope.isContributor = auth.isContributor;
  $scope.isUser        = auth.isUser;
  $scope.items         = items.items;
  $scope.isMine        = items.isMine;

  // for purposes of capitalized and well spaced display from item.type field
  $scope.itemTitles = items.titles;

  // Initialize a brand new item from Item constructor
  $scope.initItem = function(type) {
    $scope.item = new Item(type);
  };

  // CREATE-POST new item
  $scope.addItem = function() {
    items.create($scope.item)
    .then(function(data){
      console.log('success');
      $scope.items = items.items;
      $scope.item = new Item();
      console.log(data);
     }).catch(function(){
         console.log('failure');
     });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Item",{"area":"shop", "page":"shop", "action":"create"});
   // mixpanel.track("Shop Page: Added Item");
  };

  // PUT UPDATES - 
  // Initialize the edit state -- ultimate save will be in the directive that
  // handles the item type

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
