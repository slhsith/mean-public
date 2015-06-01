app.directive('dietPlan', function() {
  return {
    restrict: 'E',
    scope: {
      diet: '=item'
    },
    controller: 'DietCtrl',
    templateUrl: 'shop.dietplan.tpl.html',
    link: function(scope, element, attrs) {}
  };
});


