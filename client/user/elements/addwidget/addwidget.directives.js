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

// ------------ ITEM REPEATS
app.directive('addWidgetItem', function () {

  var tpl = '<div>'+ 
              '<div class="add-widget-photo">'+
                '<img ng-src="{{item.photo}}"/>'+
              '</div>'+ 
              '<div class="add-widget-body item-body" ng-transclude></div>'+
              '</div>';

  return {
    restrict: 'E', 
    scope: {
      item: '='
    },
    transclude: true,
    template: tpl
  };

});

// ------------ FORM FOR NEW ITEM
app.directive('addWidgetForm', function () {

  var tpl = '<div style="border: 1px solid #999" ng-show="item">'+
              '<div class="col-sm-2" ngf-drop ngf-accept="\'image/*\'"' +
                'ng-model="item.photo" style="border: 2px dotted lightgray">' +
                '<button class="btn btn-xs btn-default" ngf-select ngf-accept="\'image/\'"' +
                  'ng-model="item.photo">select photo</button>' +
                '<img ng-if="item.photo" ngf-src="item.photo[0]" ngf-accept="\'image/*\'" style="max-height: 40px">' +
              '</div>'+
              '<div class="col-sm-10 item-form">'+
                '<ng-transclude></ng-transclude>'+
              '</div>'+
           '</div>';

  return {
    restrict: 'E', 
    scope: {
      item: '='
    },
    transclude: true,
    template: tpl,
    link: function(scope, element, attrs, ctrl, transcludeFn) {

      // transcludeFn(scope.$parent.$parent, function(clone) {
        // element.find('item-form').append(clone);
      // });
    }
  };
});




// ------------ PLUS BUTTON
app.directive('addWidgetPlus', function () {
  var tpl = '<div class="text-center" style="height: 50px; line-height: 57px; border: 1px solid #999" title="Add {{item_type}}">'+
            '<i class="fa fa-2x fa-plus"></i> {{item_type}}'+
            '</div>';
  return {
    restrict: 'E', 
    template: tpl,
    link: function(scope, element, attrs, ctrl) {
      element.bind('click', function() {
        console.log('clicked');
      });
    }
  };
});

