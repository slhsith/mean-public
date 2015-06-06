app.directive('dietPlan', function () {
  
  return {
    restrict: 'E', 
    scope: { item: '=item' },
    controller: 'DietCtrl',
    templateUrl: 'shop.dietplan.tpl.html',
    link: function(scope, element, attrs, DietCtrl) {
      DietCtrl.init( element );
      if (scope.item._id) {
        scope.dayIndex  = 1;
        scope.mealIndex = 1;
        scope.viewingDay = scope.item.days[0];
        scope.mealCount  = scope.viewingDay.meals.length;
      }
    }
  };

});


app.directive('recipeCreator', function () {
  
  return {
    restrict: 'E', 
    controller: 'DietCtrl',
    templateUrl: 'shop.recipe.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});

app.directive('workoutPlan', function () {

  return {
    restrict: 'E', 
    scope: false,
    templateUrl: 'shop.workoutplan.tpl.html',
    link: function(scope, element, attrs) {
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



