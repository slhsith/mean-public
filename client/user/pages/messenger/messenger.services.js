app.factory('messenger', function ($http, auth) {

  var o = {
    conversations: []
  };

  o.getAll = function() {
    return $http.get('/api/conversations').success(function(data) {
      console.log(data);
      angular.copy(data, o.conversations);
    });
  };

  o.get = function(id) {
    return $http.get('/api/conversation/' + id).success(function(data) {
      return data;
    });
  };

  o.createConversation = function(convo) {
    return $http.post('/api/conversation', convo, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      return data;
    });
  };

  o.createMessage = function(convo, message) {
    console.log('convo', convo, 'message', message);
    return $http.post('/api/conversation/' + convo._id + '/messages', message, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      return data;
    });
  };

  return o;

});
