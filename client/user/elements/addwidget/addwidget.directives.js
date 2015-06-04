/*

ROW WIDGET FOR ADDING UNITS TO SUBARRAYS OF ITEMS & EVENTS
- subobject                   -> OBJECT
--------------------------------------------------
- meals, recipes, ingredients -> DIETPLANS
- packages                    -> BOOTCAMPS
- items                       -> ONLINE CHALLENGES
- exercises                   -> WORKOUTPLANS ?
<!-- <add-widget class="colasyoulike" parent="recipe" children="ingredients"> -->
<!-- recipe.ingredients = [ ingredient ] -->
<add-widget parent="recipe" child="'ingredient'" children="recipe.ingredients"></add-widget>
*/
app.directive('tvAddWidget', function () {

  return {
    restrict: 'E', 
    scope: {
      parent: '=parent',
      items: '=children'
    },
    transclude: true,
    controller: 'addWidgetCtrl',
    template: ['<div>',
               '<ng-transclude></ng-transclude>',
               // '<tv-add-widget-item ng-repeat="item in items"></tv-add-widget-item>',
               // '<tv-add-widget-form></add-widget-form>',
               // '<tv-add-widget-plus><tv-add-widget-plus>',
               '</div>'
               ].join(),
    // templateUrl: 'addwidget.tpl.html',
    // link: function(scope, element, attrs) {}
  };

});

app.directive('tvAddWidgetItem', function () {

  return {
    restrict: 'E', 
    require: 'tvAddWidget',
    transclude: true,
    replace: true,
    template: ['<div>',
                 '<div class="add-widget-photo"><i class="fa fa-3x fa-photo"></i></div>',
                 // '<div class="add-widget-photo"><img src="item.photo"/></div>',
                 '<div class="add-widget-title">{{item.name}}</div>',
                 '<div class="add-widget-body"><ng-transclude></ng-transclude></div>',
               '</div>'
              ].join()
    }
  };

});

app.directive('tvAddWidgetForm', function () {

  return {
    restrict: 'E', 
    require: 'tvAddWidget',
    transclude: true,
    replace: true,
    template: '<div><ng-transclude></ng-transclude></div>',
    link: function(scope, element, attrs) {
    }
  };
});

app.directive('tvAddWidgetPlus', function () {
  return {
    restrict: 'E', 
    template: '<div style="border: 1px solid #999"><i class="fa fa-2x fa-plus"></i></div>'
  };
});

