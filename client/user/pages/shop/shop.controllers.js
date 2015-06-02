/*  ----------------------  *
    CONTROLLER - DIETPLAN
 *  ----------------------  */
/* 
/* ---------------------------- */
app.controller('DietCtrl', function ($scope, $attrs, dietPlans, Meal, Diet, Recipe, CookingStep, Ingredient) {
  var self = this;
  $scope.debug = true;

  // ---- INIT SCOPE ----  //
  this.init = function(element) {
    self.$element = element;
  };

  //$scope.diet       = item comes from directive
  $scope.meal         = null;
  $scope.recipe       = null;
  $scope.step         = null;
  $scope.ingredient   = null;

  $scope.initMeal     = function() {
    $scope.meal = new Meal();
  };
  $scope.initRecipe   = function() {
    $scope.recipe = new Recipe();
  };
  $scope.initStep     = function() {
    $scope.step = new CookingStep();
    $scope.step.order = $scope.recipe.steps.length;
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
    dietPlans.create($scope.diet).success(function(data) {
      $scope.diet._id = data._id;
    });
  };

  $scope.saveMeal     = function() {
    $scope.meal = new Meal();
  };
  $scope.saveRecipe   = function() {
    $scope.recipe = new Recipe();
  };
  $scope.saveStep     = function() {
    $scope.step = new CookingStep();
    $scope.step.order = $scope.recipe.steps.length;
  };
  $scope.saveIngredient = function() {
    $scope.ingredient = new Ingredient();
  };







});
