/*  ----------------------  *
    CONTROLLER - DIETPLAN
 *  ----------------------  */
/* 
/* ---------------------------- */
app.controller('DietCtrl', function ($scope, $attrs, items, dietplans, Meal, Diet, Day, Recipe, CookingStep, Ingredient) {
  var self = this;
  $scope.debug = true;

  // ---- INIT SCOPE ----  //
  this.init = function(element) {
    angular.extend($scope.dietplan, new Diet());

    if ($scope.dietplan.days.length === 0) {
      $scope.dietplan.days.push(new Day());
    } 
    angular.forEach($scope.dietplan.days, function(day) {
      day.mealOrder = 1;
    });
    $scope.dayOrder = 1;
  };

  $scope.decrementDay = function() {
    if ($scope.dayOrder > 1) $scope.dayOrder--;
  };
  $scope.incrementDay = function() {
    // a diet day index goes from 1 to duration
    if ($scope.dayOrder < $scope.dietplan.duration) {
      $scope.dayOrder++; 
    } else {
      alert('going over days, increase duration confirmation?');
    }
  };

  $scope.decrementMeal = function(day) {
    if (day.mealOrder > 1) day.mealOrder--;
  };
  $scope.incrementMeal = function(day) {
    if (day.mealOrder < day.meals.length)
     day.mealOrder++;
  };


  $scope.saveDiet     = function() {
    if ($scope.dietplan._id) {
      items.update($scope.dietplan);
    } else {
      items.save($scope.dietplan).then(function(data) {
        $scope.dietplan = data;
        $scope.$parent.items = items.items;
        $scope.initMeal();
        $scope.meal.day = 1;
      });
    }
  };

//DAY
$scope.saveDayTitle = function(day) {
  dietplans.updateDay(day);
};
  $scope.saveDay = function(day) {
    dietplans.updateDay($scope.dietplan, day).then(function(data) {
      console.log(data);
      $scope.dietplan.days = data;
    });
  };

//MEAL
  $scope.initMeal     = function() {
    $scope.meal = new Meal();
    $scope.dietplan.day[$scope.dayOrder-1].meals.push($scope.meal);
  };
  $scope.cancelMeal   = function() {
    $scope.meal = null;
  };

// RECIPE
  $scope.initRecipe   = function() {
    $scope.recipe = new Recipe();
  };
  $scope.initNewRecipe   = function() {
    $scope.newRecipe = new Recipe();
  };
  $scope.pushRecipe = function() {
    if ($scope.recipe.name && $scope.recipe.yield) {
      var day = $scope.dietplan.days[$scope.dayOrder-1];
      day.meals[day.mealOrder-1].recipes.push($scope.recipe);
    }
  };
  $scope.cancelRecipe = function() {
    $scope.recipe = null;
  };
  $scope.saveRecipe   = function() {
    $scope.meal.recipes.push($scope.recipe);
    $scope.recipe = null;
  };
  $scope.searchRecipes = function(query) {
    dietplans.searchRecipes(query).then(function(data) {
      $scope.recipe.results = data;
    });
  };
  $scope.selectRecipe = function(recipe) {
    $scope.recipe = recipe;
  };


});

app.controller('RecipeCtrl', function($scope, CookingStep, Ingredient, dietplans) {

  $scope.createRecipe   = function() {
    dietplans.createRecipe($scope.recipe).then(function(data) {
      $scope.recipe._id = data._id;
    });
  };

//COOKINGSTEP
  $scope.initStep     = function() {
    $scope.step = new CookingStep($scope.recipe.steps.length+1);
  };
  $scope.pushStep     = function() {
    $scope.recipe.steps.push($scope.step);
    $scope.step = null;
  };
  $scope.cancelStep   = function() {
    $scope.step = null;
  };

//INGREDIENT
  $scope.initNewIngredient = function() {
    $scope.ingredient = new Ingredient();
  };
  $scope.cancelIngredient = function() {
    $scope.ingredient = null;
  };
  $scope.pushIngredient = function() {
    console.log($scope.recipe);
    $scope.recipe.ingredients.push($scope.ingredient);
    $scope.ingredient = null;
  };
  $scope.saveNewIngredient = function(ingredient) {
    dietplans.createIngredient(ingredient);
    $scope.ingredient.results = null;
  };
  $scope.searchIngredients = function(query) {
    dietplans.searchIngredients(query).then(function(data) {
      $scope.ingredient.results = data;
    });
  };
  $scope.selectIngredient = function(ing) {
    $scope.ingredient = ing;
  };

  $scope.units = [{'name': 'tsp'},
                  {'name': 'Tbs'},
                  {'name': 'C'},
                  {'name': 'g'},
                  {'name': 'lb'},
                  {'name': 'ml'}];
});