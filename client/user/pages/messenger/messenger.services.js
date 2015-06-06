app.factory('messenger', function ($http, auth) {

  var o = {
    conversations: [],
    map: {}
  };

  o.getAll = function() {
    return $http.get('/api/conversations', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      angular.copy(data, o.conversations);
      angular.forEach(data, function(convo) {
        o.map[convo._id] = convo;
      });
      return data;
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
      console.log('create convo data', data);
      return data;
    });
  };

  o.postMessage = function(convo, message) {
    return $http.post('/api/conversation/' + convo._id + '/messages', message, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      return data;
    });
  };

  o.readMessages = function(convo) {
    return $http.put('/api/conversation/' + convo._id + '/read', { user_id: auth.getUser()._id }, {
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


app.factory('messageSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('tokenrequest');
  socket.forward('broadcast');
  socket.forward('conversations');
  socket.forward('newmessage');
  socket.forward('newconversation');
  socket.forward('readmessages');
  
  return socket;
});