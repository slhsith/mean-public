app.directive('dietPlan', function () {
  
  return {
    restrict: 'E', 
    scope: {
      diet: '=item'
    },
    controller: 'DietCtrl',
    templateUrl: 'shop.dietplan.tpl.html',
    link: function(scope, element, attrs, DietCtrl) {
      DietCtrl.init( element );
    }
  };

});


app.directive('digitalMedia', function () {

  return {
    restrict: 'E', 
    scope: false,
    templateUrl: 'shop.digitalmedia.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});



