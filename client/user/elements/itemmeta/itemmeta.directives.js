/*

ITEM META DATA FORM
data = scope.item
options = scope.itemMetaOptions {
  video: {
    name: 'Video',
    type: 'video',
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
  
}

<item-meta data="item" options="options"></item-meta>

*/





// ------------ CONTAINER
app.directive('itemMeta', function () {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=', 
    },
    controller: 'DietCtrl',
    templateUrl: 'itemmeta.tpl.html',
    link: function(scope, elem, attr) {
      console.log('item meta', scope);
    }

  };
});
