// GROUPS
app.factory('groups', ['$http', 'auth', function($http, auth){
  var o = {
    groups: [],
    group: {}
  };

  o.getAll = function() {
    return $http.get('/api/groups').then(function(res){
      console.log(res.data);
      angular.copy(res.data, o.groups);
    });
  }; 
  o.create = function (group) {
   console.log(group);
   return $http.post('/api/groups', group ).then(function(res){
     console.log(res.data);
     o.groups.push(res.data);
   });
  };
  o.get = function(id) {
    return $http.get('/api/group/' + id).then(function(res){
      console.log(res.data);
      return res.data;
    });
  };
  o.createGpost = function(gpost, id) {
    console.log(gpost, id);
    return $http.post('/api/group/' + id + '/gposts', gpost, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.createGcomment = function (gpost_id, gcomment) {
    console.log('gpost_id in factory', gpost_id);
    console.log('gcomment in factory', gcomment);
    return $http.post('/api/gpost/' + gpost_id + '/gcomments', gcomment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  return o;
}]);

app.factory('gposts', ['$http', 'auth', function($http, auth){
  var o = {
    gposts: [],
    gpost: {}
  };

  o.getAll = function(id) {
    return $http.get('/api/group/' + id + '/gposts').then(function(res){
      console.log(res.data);
      angular.copy(res.data, o.gposts);
    });
  };

  // o.upvote = function(gpost) {
  //   return $http.put('/api/gposts/' + post._id + '/upvote', null, {
  //     headers: {Authorization: 'Bearer '+auth.getToken()}
  //   }).then(function(res){
  //     gpost.upvotes += 1;
  //   });
  // };
  // o.get = function(id) {
  //   return $http.get('/api/gposts/' + id).then(function(res){
  //     return res.data;
  //   });
  // };
  // o.addGroupComment = function(id, gcomment) {
  //   return $http.post('/api/gposts/' + id + '/gcomments', gcomment, {
  //     headers: {Authorization: 'Bearer '+auth.getToken()}
  //   });
  // };
  return o;
}]);


app.factory('gcomments', function($http, auth){
  var o = {
    gcomments: []
  };  
  o.getAll = function() {
    return $http.get('/api/gcomments').then(function(res){
      angular.copy(res.data, o.gcomments);
    });
  };
  return o;
}); 

app.service('popupService', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  };
});
