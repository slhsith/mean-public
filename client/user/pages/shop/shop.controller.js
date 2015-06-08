app.controller('ShopCtrl', function ($scope, items, Item, auth) {

  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
  $scope.items = items.items;

  // for purposes of capitalized and well spaced display from item.type field
  $scope.itemTitles = {
    workoutplan: 'Workout Plan',
    dietplan: 'Diet Plan',
    book: 'Book',
    video: 'Video',
    podcast: 'Podcast',
    bootcamp: 'Bootcamp',
    challenge: 'Online Challenge'
  };

  // Initialize a brand new item from constructor
  $scope.initItem = function(type) {
    $scope.item = new Item(type);
  };

  // CREATE-POST new item
  $scope.addItem = function() {
    items.create($scope.item).success(function(data){
      console.log('success');
      $scope.items = items.items;
      $scope.item = new Item();
      console.log(data);
     }).error(function(){
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

  $scope.isMine = function(item) {
    return item.creator._id === $scope.user._id;
  };
  
  $scope.editItem = function(item) {
    $scope.item = item;
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
