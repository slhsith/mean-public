/*

SLIDES WIDGET TO VIEW CONTENT THAT CAN BE VIEWED LIKE CAROUSEL
can tick through a single array
data = 
scope.item.days = [
  { order: 1, meals: [ {}, {}, {} ] },
  { order: 2, meals: [ {}, {}, {} ] },
  { order: 3, meals: [ {}, {}, {} ] },
]

<slide-display data=item.days></slide-display>

*/


// ------------ CONTAINER
app.directive('slideDisplay', function () {

  var slideCtrl = function($scope) {
    var self = this,
        currentIndex = -1,
        currentSlide;
    var slides = [];

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
    restrict: 'E',
    scope: {
      data: '=',
      options: '=', 
    },
    transclude: true,
    controller: 'slideCtrl',
    template: '<div class="col-sm-12" ng-transclude></div>'
  };

});

// app.directive('meal', function() {
//   var template = '<div ng-class="{\'active\': active }" class="item text-center" ng-transclude></div>';
//   return {
//     require: '^mealDisplay',
//     restrict: 'E',
//     transclude: true,
//     replace: true,
//     scope: {
//       active: '=?',
//       index: '=?'
//     },
//     link: function (scope, element, attrs, dietCtrl) {
//       dietCtrl.addSlide(scope, element);
//       //when the scope is destroyed then remove the slide from the current slides array
//       scope.$on('$destroy', function() {
//         dietCtrl.removeMeal(scope);
//       });

//       scope.$watch('active', function(active) {
//         if (active) {
//           dietCtrl.select(scope);
//         }
//       });
//     }
//   };
// });
