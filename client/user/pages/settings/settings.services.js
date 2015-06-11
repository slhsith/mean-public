// SETTINGS
app.factory('settings', function ($http, $window, auth) {

  var s = { settings : {} };

  s.getAll = function () {
    return $http.get('/api/settings').then(function(res){
      angular.copy(res.data, s.settings);
    });
  };

  s.update = function (user) {
    console.log('updating user', user);
    return $http.put('/api/settings', user).then(function(res){
      s.settings = res.data;
    });
  };

  /*  1  get signed_request
   *  2  put from client -> aws
   *  3  send success back to back_end so it can put an update to filename & save to user
   */
  s.uploadAvatar = function (user) {
    // file uploader is an array
    user.avatar = user.avatar[0];

    return $http.get('/api/user/' + user._id + '/avatar?name=' + user.avatar.name + '&type=' + user.avatar.type).then(function(res) {
      return $http.put(res.data.signed_request, user.avatar, {
        headers: { 
          'x-amz-acl': 'public-read', 
          'x-amz-meta-userid': user._id,
          'x-amz-meta-role': 'avatar',
          'Content-Type': user.avatar.type,
        }
      });
    })
    .then(function(res){
      console.log('amazon putObject result', res);
      var req = {
        filename: user.avatar.name, 
        headers: res.headers()
      };
      return $http.put('/api/user/' + user._id + '/avatar', req, {
        headers: { 'Authorization': 'Bearer '+auth.getToken() }
      }); 
    }).then(function(res) {
      return res.data;
    }).catch(function(err) {
      console.log(err); 
      return err;
    }); 
  };

  s.get = function (handle) {
    return $http.get('/api/user/handle/' + handle).then(function(res){
      console.log('user by handle', res.data);
      return res.data;
    });
  };

   return s;
});
