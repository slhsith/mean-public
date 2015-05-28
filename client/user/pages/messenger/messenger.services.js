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
    console.log('convo', convo, 'message', message.body, message);
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

app.factory('Message', function() {
  var Message = function(user) {
    var self = this;
    self.user = user._id || null;
    self.f_name = user.f_name || null;
    self.l_name = user.l_name || null;
    self.handle = user.handle || null;
  };


  return Message;

});


app.factory('messengerSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});