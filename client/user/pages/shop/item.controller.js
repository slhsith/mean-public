app.controller('ItemCtrl', function ($scope, $state, $stateParams, items, auth, Item, itemPromise, popupService) {

  $scope.items = items.items;
  if ($state.is('items')) $scope.item = new Item();
  if ($state.is('item')) $scope.item = items.item;

  $scope.isUser        = auth.isUser;
  $scope.isContributor = auth.isContributor;
  $scope.isAdmin       = auth.isAdmin;
  $scope.isMine        = items.isMine;


  $scope.deleteItem = function () {
    console.log('delete', $scope.item._id);
    if (popupService.showPopup('Are you sure you want to delete this item?')) {
      items.delete($scope.item._id).success(function(data){
        console.log(data.message);
        $state.go('shop');
      });
    }
  };


});
