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

app.directive('mealDisplay', function() {

  var mealDisplayCtrl = function($scope) {
    var self = this,
        currentIndex = -1,
        currentMeal;
    var meals = [];

    $scope.$watch($scope.viewingDay.meals, function(newval) {
      meals = $scope.viewingDay.meals;
    });

    $scope.next = function() {
      var newIndex = (self.getCurrentIndex() + 1) % meals.length;
    };

    $scope.prev = function() {
      var newIndex = self.getCurrentIndex() -1 < 0? meals.length -1 : self.getCurrentIndex - 1;
    };

    $scope.isActive = function(meal) {
      return self.currentMeal === meal;
    };

  };

  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    controller: mealDisplayCtrl,
    templateUrl: 'dietplan.mealdisplay.tpl.html',
  };
});

app.directive('meal', function() {
  var template = '<div ng-class="{\'active\': active }" class="item text-center" ng-transclude></div>';
  return {
    require: '^mealDisplay',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      active: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, dietCtrl) {
      dietCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        dietCtrl.removeMeal(scope);
      });

      scope.$watch('active', function(active) {
        if (active) {
          dietCtrl.select(scope);
        }
      });
    }
  };
});

app.directive('mealRecipes', function() {
  return {
    restrict: 'E',
    // scope: {
    //   recipes: '='
    // },
    template: ['<div ng-repeat="recipe in recipes">',
                '<div class="col-sm-3><i class="fa fa-2x fa-photo"></i></div>',
                '<div class="col-sm-9>{{recipe.title}} <br/>',
                '{{recipe.yield}} Servings</div>',
                '</div>'].join(),
    link: function() {}

  };
});

app.directive('mealRecipeAdder', function() {
  return {
    restrict: 'E',
    template: ['<div>', 
                 '<div ng-show="recipe"><small>upload</small> <i class="fa fa-lg fa-photo"></i>',
                   '<input type="text" placeholder="Recipe" ng-model="recipe.title" ng-blur="searchRecipes()">',
                   '<input type="text" placeholder="Servings" ng-model="recipe.yield">',
                   '<br/><a ng-click="initRecipe()">+ new recipe</a>',
                 '</div>',
                 '<div style="border: 1px solid #999" ng-click="initMeal()" ><i class="fa fa-2x fa-plus"></i></div>',
               '</div>'].join(),
//     link: function() {}
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



