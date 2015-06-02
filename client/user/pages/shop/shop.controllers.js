/*  ----------------------  *
    CONTROLLER - DIETPLAN
 *  ----------------------  */
/* 
/* ---------------------------- */
app.controller('DietCtrl', function ($scope, $attrs, Meal, Diet, Recipe, CookingStep, Ingredient) {
  var self = this;
  $scope.debug = true;

  // ---- INIT SCOPE ----  //
  this.init = function(element) {
    self.$element = element;
    $scope.diet = $scope.item || new Diet({});
  };


  $scope.meal = new Meal({});
  $scope.recipe = new Recipe({});
  $scope.initStep = function() {
    $scope.step = new CookingStep({order: $scope.recipe.steps.length});
  };
  $scope.initIngredient = function() {
    $scope.ingredient = new Ingredient({});
  };
  $scope.cancelIngredient = function() {
    $scope.ingredient = null;
  };


  $scope.showRecipe = false;

  // // ------ METHODS FOR CONVERSATIONS ------ //

  $scope.initNewRecipe = function() {
    $scope.showRecipe = true;
    $scope.recipe = new Recipe({});
  };



});
