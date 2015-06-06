app.directive('dietPlan', function () {
  
  return {
    restrict: 'E', 
    scope: { item: '=item' },
    controller: 'DietCtrl',
    templateUrl: 'shop.dietplan.tpl.html',
    link: function(scope, element, attrs, DietCtrl) {
      DietCtrl.init( element );
    }
  };

});

app.directive('mealItinerary', function () {
  
  return {
    restrict: 'E', 
    controller: 'DietCtrl',
    templateUrl: 'shop.mealitinerary.tpl.html',
    link: function(scope, element, attrs) {
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



