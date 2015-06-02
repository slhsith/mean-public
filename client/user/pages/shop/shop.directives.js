app.directive('dietPlan', function () {
  
  return {
    restrict: 'E', 
    scope: {
      item: '='
    },
    controller: 'DietCtrl',
    templateUrl: 'shop.dietplan.tpl.html',
    link: function(scope, element, attrs, DietCtrl) {
      DietCtrl.init( element );
    }
  };

});


