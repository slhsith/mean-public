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





// ------------ CONTAINER
app.directive('addWidget', function () {
  return {
    restrict: 'E',
    scope: {
      set: '=',
      options: '=', // array with fields and styling options objects
      // save: '&',
      // init: '&'
    },
    transclude: true,
    controller: 'addWidgetCtrl',
    template: '<div class="col-sm-12" ng-transclude></div>'
  };
});




// ------------ ITEM REPEATS
app.directive('addWidgetItems', function () {

  var tpl = '<div ng-repeat="item in set">'+
              '<div class="add-widget-photo">'+
                '<i class="fa fa-3x fa-photo"></i>'+
              '</div>'+ 
            // '<div class="add-widget-photo"><img src="item.photo"/></div>'+
              '<div class="add-widget-title">{{item.name}}</div>'+
              '<div class="add-widget-body" ng-transclude></div>'+
              '</div>';

  return {
    restrict: 'E', 
    require: '^addWidget',
    transclude: true,
    template: tpl
  };

});

// ------------ FORM FOR NEW ITEM
app.directive('addWidgetForm', function () {

  var tpl = '<div style="border: 1px solid #999" title="New {{item_type}}" ng-show="options.item">'+
                '<div class="col-sm-2"><i class="fa fa-2x fa-photo"></i></div>'+
                '<div class="col-sm-10">'+
                  '<span ng-transclude></span>'+
                  '<input class="col-sm-{{options.searchable? \'8\' : \'12\'}}" type="text" placeholder="options.name" ng-model="item.name" ng-show="!!options.name">'+
                  '<button class="btn-sm col-sm-4" ng-click="search()" ng-if="options.search">'+
                    '<i class="fa fa-search"></i>'+
                  '</button>'+
                  '<input ng-class="field.class" type="text" ng-repeat="field in options.fields" placeholder="{{field.field}}" ng-model="item[field.field]">'+
                  '<button class="form-control btn-xs" ng-click="save()"><i class="fa fa-floppy-o"></i></button>'+
                '</div>'+
             '</div>';

  return {
    restrict: 'E', 
    require: '^addWidget',
    transclude: true,
    replace: true,
    template: tpl,
    link: function(scope, element, attrs, ctrl) {
    }
  };
});





// ------------ PLUS BUTTON
app.directive('addWidgetPlus', function () {
  var tpl = '<div class="text-center" style="height: 50px; border: 1px solid #999" title="Add {{item_type}}">'+
            '<i class="fa fa-2x fa-plus"></i> {{item_type}}'+
            '</div>';

  return {
    restrict: 'E', 
    require: '^addWidget',
    template: tpl,
    replace: true,
    link: function(scope, element, attrs, ctrl) {
      element.bind('click', function() {
        scope.$apply(scope.$parent.options.init());
        console.log('clicked');
      });
    }
  };
});

