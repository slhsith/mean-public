app.directive('fileUpload', function() {
  return {
  	restrict: 'EA',
  	link: function(scope, elem, attr) {
  		console.log('directive fileUpload scope\n', scope);
  		console.log('directive fileUpload elem\n', elem);
  		elem.bind('change', function(event) {
          scope.user.avatar = event.target.files[0];
          console.log(scope.user, event);
  		});
  	}

  };

});