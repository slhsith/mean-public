app.directive('dietPlan', function () {
  
  return {
    restrict: 'E', 
    scope: false,
    controller: 'DietCtrl',
    templateUrl: 'dietplan.tpl.html',
    link: function(scope, element, attrs, DietCtrl) {
      DietCtrl.init( element );
    }
  };

});

app.directive('mealItinerary', function () {
  
  return {
    restrict: 'E', 
    templateUrl: 'mealitinerary.tpl.html'
  };

});

app.directive('recipeCreator', function () {
  
  return {
    restrict: 'E', 
    scope: {
      recipe: '='
    },
    controller: 'RecipeCtrl',
    templateUrl: 'recipecreator.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});

app.directive('recipeFinder', function () {
  
  return {
    restrict: 'E', 
    controller: 'RecipeCtrl',
    templateUrl: 'recipefinder.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});

app.directive('ingredientFinder', function () {
  
  return {
    restrict: 'E', 
    controller: 'RecipeCtrl',
    templateUrl: 'ingredientfinder.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});