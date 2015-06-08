app.directive('avatarUpload', function() {
  return {
    restrict: 'EA',
    link: function(scope, elem, attr) {
      console.log('directive fileUpload scope\n', scope);
      console.log('directive fileUpload elem\n', elem);
      elem.bind('change', function(event) {
          scope.user.avatar = event.target.files[0];
          var ext = '.' + scope.user.avatar.name.split('.').pop();
          scope.user.avatar.name = 'user_avatar_' + scope.user._id + '_' 
                                    + new Date().getTime() + ext;
          console.log(scope.user, event);
      });
    }

  };

});

/*
 * For generic file uploading purposes
 * Usage: <input type="file" file-upload="ingredient.image">
 */
app.directive('fileUpload', function() {
  return {
    restrict: 'EA',
    scope: {
      target: '='
    },
    link: function(scope, elem, attr) {
      console.log('file upload directive', scope, elem);
      elem.bind('change', function(event) {
        attr.fileUpload = (event.srcElement || event.target).files[0];
        console.log(attr.fileUpload);
        console.log()
      });
    }
  };

});