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
    } else {
      $scope.viewingDay = $scope.item.days[0];
    }
    $scope.dayIndex = 0;
    $scope.mealIndex = 0;
  };

  $scope.decrementDay = function() {
    if ($scope.dayIndex > 0) $scope.dayIndex--;
    $scope.viewingDay = $scope.item.days[$scope.dayIndex];
  };
  $scope.incrementDay = function() {
    // a diet day index goes from 0 to one less than duration
    if ($scope.dayIndex < $scope.item.duration-1) {
      $scope.dayIndex++; 
      $scope.item.days[$scope.dayIndex] = $scope.item.days[$scope.dayIndex] || new Day($scope.dayIndex);
      $scope.viewingDay = $scope.item.days[$scope.dayIndex];
      $scope.mealCount  = $scope.viewingDay.meals.length;
      $scope.viewingMeal = $scope.viewingDay.meals[0] || new Meal();
    } else {
      alert('going over days, increase duration confirmation?');
    }

  };

  $scope.decrementMeal = function() {
    if ($scope.mealIndex > 1) $scope.mealIndex--;
    $scope.viewingMeal = $scope.viewingDay.meals[$scope.mealIndex];
  };
  $scope.incrementMeal = function() {
    if ($scope.mealIndex < ($scope.viewingDay.meals.length)) 
      $scope.mealIndex++;
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
    $scope.viewingDay.meals.push($scope.recipe);
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
    items.updateDietplan($scope.item, $scope.viewingDay).success(function(data) {
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

  $scope.options = [{
    fields: [
      {    field: 'title', 
            name: 'Title',
           class: 'col-sm-12',
        required: true
      }, {
           field: 'hashtag',
            name: 'Hashtag',
           class: 'col-sm-6',
      }
    ]
  },{

  }];



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
      type: 'ingredient',
      searchable: false,
      save: $scope.saveMeal,
      init: $scope.initRecipe,
      //transclude: + create new recipe
      fields  : [ {field: 'recipe', class: 'col-sm-6'},
                  {field: 'servings', class: 'col-sm-6'} ],
      item: $scope.recipe,
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
