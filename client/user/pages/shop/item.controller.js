app.controller('ItemCtrl', function ($scope, $state, $stateParams, items, auth, Item, itemPromise, popupService) {

  $scope.items = items.items;
  $scope.item = itemPromise;

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
