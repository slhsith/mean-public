app.factory('messenger', function ($http, auth) {

  var o = {
    conversations: []
  };

  o.getAll = function() {
    return $http.get('/api/conversations', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
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
    }).then(function(res) {
      return res.data;
    });
  };

  o.createMessage = function(convo, message) {
    console.log('convo', convo, 'message', message);
    return $http.post('/api/conversation/' + convo._id + '/messages', message, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      return res.data;
    });
  };

  o.readMessages = function(convo) {
    console.log('reading messages');
    return $http.put('/api/conversation/' + convo._id + '/read', { user: auth.getUser()._id }, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  return o;

});

app.factory('Conversation', function() {

  var Conversation = function () {
    var self = this;
    self.users = [];
    self.messages = [];
    self.new = true;
  };

  return Conversation;

});

