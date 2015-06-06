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
