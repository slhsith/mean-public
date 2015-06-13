app.directive('digitalMedia', function () {

  return {
    restrict: 'E', 
    scope: false,
    templateUrl: 'digitalmedia.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});

app.directive('digitalMediaEditor', function () {

  return {
    restrict: 'E', 
    scope: false,
    templateUrl: 'digitalmedia.editor.tpl.html',
    link: function(scope, element, attrs) {
    }
  };

});



