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

    if ($scope.item.days.length === 0) {
      $scope.item.days.push(new Day());
    } 
    angular.forEach($scope.item.days, function(day) {
      day.mealOrder = 1;
    });
    $scope.dayOrder = 1;
  };

  $scope.decrementDay = function() {
    if ($scope.dayOrder > 1) $scope.dayOrder--;
  };
  $scope.incrementDay = function() {
    // a diet day index goes from 1 to duration
    if ($scope.dayOrder < $scope.item.duration) {
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

  //$scope.item   = item comes from directive
  $scope.meal         = null;
  $scope.recipe       = null;
  $scope.step         = null;
  $scope.ingredient   = null;

  $scope.initMeal     = function() {
    $scope.meal = new Meal();
    $scope.item.day[$scope.dayOrder-1].meals.push($scope.meal);
  };
  $scope.initRecipe   = function() {
    $scope.recipe = new Recipe();
    var day = $scope.item.days[$scope.dayOrder-1];
    day.meals[day.mealOrder-1].recipes.push($scope.recipe);
    $scope.addWidgetOptions.recipe.item = $scope.recipe;
  };
  $scope.initStep     = function() {
    $scope.step = new CookingStep();
    $scope.step.order = $scope.recipe.steps.length+1;
    $scope.addWidgetOptions.cookingstep.item = $scope.step;
  };
  $scope.initIngredient = function() {
    $scope.ingredient = new Ingredient();
    $scope.addWidgetOptions.ingredient.item = $scope.step;
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
    items.updateDietplan($scope.item, $scope.item.days[$scope.dayOrder-1]).success(function(data) {
      console.log(data);
      $scope.item.days_set = data.days_set;
      $scope.item.days     = data.days;
    });
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


  $scope.addWidgetOptions = {
    ingredient: {
      name: 'Ingredient',
      type: 'ingredient',
      searchable: true,
      fields: [ {field: 'amount', class: 'col-sm-6'},
                {field: 'preparation', class: 'col-sm-6'}, 
                {field: 'note', class: 'col-sm-12'}],
      item: $scope.ingredient
    },

    recipe    : {
      name: 'Recipe',
      type: 'recipe',
      searchable: false,
      save: $scope.saveMeal,
      init: $scope.initRecipe,
      //transclude: + create new recipe
      fields  : [ {field: 'recipe', class: 'col-sm-6'},
                  {field: 'servings', class: 'col-sm-6'} ],
      item: null,
    },

    step      : {
      show_name: false,
      type: 'cookingstep',
      searchable: false,
      //transclude: Step #
      fields: [ {field: 'description', class: 'col-sm-12'} ],
      item: $scope.step
    }
  };


});
