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
    self.$element = element;

    // initDaysForFullDuration();

  };

  function initDaysForFullDuration () {
    var duration = $scope.item.duration;
    var day, days_existing = $scope.item.days.length;
    while (days_existing < duration) {
        day = new Day();
        day.day.order = days_existing+1;
        $scope.item.days.push(day);
        days_existing++;
    } 
    $scope.dayIndex  = 1;
    $scope.mealIndex = 1;
    $scope.viewingDay = $scope.item.days[0];
    $scope.mealCount  = $scope.viewingDay.meals.length;
  }


  $scope.decrementDay = function() {
    if ($scope.dayIndex > 1) $scope.dayIndex--;
    $scope.viewingDay = $scope.item.days[$scope.dayIndex];
    $scope.mealCount = $scope.viewingDay.meals.length;
  };
  $scope.incrementDay = function() {
    if ($scope.dayIndex < ($scope.item.days.length)) $scope.dayIndex++;
    $scope.viewingDay = $scope.item.days[$scope.dayIndex];
    $scope.mealCount  = $scope.viewingDay.meals.length;
  };

  $scope.decrementMeal = function() {
    if ($scope.mealIndex > 1) $scope.mealIndex--;
  };
  $scope.incrementMeal = function() {
    if ($scope.mealIndex < (_mealCount+1)) $scope.mealIndex++;
  };

  //$scope.item   = item comes from directive
  $scope.meal         = null;
  $scope.recipe       = null;
  $scope.step         = null;
  $scope.ingredient   = null;

  $scope.initMeal     = function() {
    $scope.meal = new Meal();
    $scope.viewingDay.meals.push($scope.meal);
  };
  $scope.initRecipe   = function() {
    $scope.recipe = new Recipe();
  };
  $scope.initStep     = function() {
    $scope.step = new CookingStep();
    $scope.step.order = $scope.recipe.steps.length+1;
  };
  $scope.initIngredient = function() {
    $scope.ingredient = new Ingredient();
  };

  $scope.cancelMeal   = function() {
    $scope.meal = null;
  };
  $scope.cancelRecipe = function() {
    $scope.recipe = null;
  };
  $scope.cancelStep   = function() {
    $scope.step = null;
  };
  $scope.cancelIngredient = function() {
    $scope.ingredient = null;
  };

  $scope.saveDiet     = function() {
    if ($scope.item._id) {
      items.update($scope.item);
    } else {
      items.create($scope.item).success(function(data) {
        $scope.item = data;
        $scope.initMeal();
        $scope.meal.day = 1;
      });
    }
  };

  $scope.saveMeal     = function() {
    console.log('viewingDay', $scope.viewingDay);
    items.update($scope.item);
  };
  $scope.saveRecipe   = function() {
    dietplans.createRecipe($scope.recipe);
    $scope.meal.recipes.push($scope.recipe);
    $scope.recipe = null;
  };
  $scope.saveStep     = function() {
    $scope.recipe.steps.push($scope.step);
    $scope.step = null;
  };
  $scope.saveIngredient = function() {
    $scope.recipe.ingredients.push($scope.ingredient);
    $scope.ingredient = null;
  };






});
