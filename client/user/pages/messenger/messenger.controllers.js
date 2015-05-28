/*  ----------------------  *
    CONTROLLER - MESSENGER
 *  ----------------------  */

/* $scope.conversation at the level of the controller is focused convo
/* --> user initializes new blank conversation
/* --> when a conversation is focused from list, defaults to [0]th one
/* ---------------------------- */

app.controller('MessengerCtrl', function ($scope, settings, users, messenger, messageSocket, Conversation, Message) {

  $scope.debug = true;

  // ---- INIT SCOPE ----  //

  // for selecting users to talk to
  $scope.users = users.getAllButSelf();
  // get all of user's metadata and extend scope user object
  angular.extend($scope.user, users.user);
  // set up metadata on the newmessage object
  $scope.newmessage = new Message($scope.user);

  // get all conversations
  $scope.conversations = messenger.conversations || [];

  if ($scope.conversations.length > 0) {
    if($scope.debug) console.log('we got a convo to see');
    setFocus($scope.conversations[0]);
  } 

  // ------ METHODS FOR CONVERSATIONS ------ //

  // Set the focus on a particular conversation
  // establishes the conversation._id in the newmessage
  // marks read timestamps for messages
  $scope.focusConversation = setFocus;
  function setFocus(conversation) {
    $scope.mainConversation = conversation;
    $scope.newmessage.conversation = conversation._id;
    if (!conversation.new) messenger.readMessages(conversation);
  }

  // Starting a new conversation
  $scope.initConversation = function() {
    if($scope.debug) console.log('main convo', !!$scope.mainConversation);
    // only init a new convo if not already in that mode
    if (!$scope.mainConversation || !$scope.mainConversation.new) {
      $scope.addUserModal = true;
      $scope.conversations.unshift(new Conversation());
      $scope.focusConversation($scope.conversations[0]);
      $scope.mainConversation.users.push($scope.user);
    } 
  };

  // Cancelling a new conversation
  $scope.cancelNewConversation = function() {
    $scope.conversations.splice(0, 1);
    $scope.focusConversation($scope.conversations[0]);
  };

  // ----- ADDRESSING USERS in a new conversation ----- //
  // Looking for Users to add to conversation
  $scope.searchUsers = function() {
    users.search($scope.conversation.userQuery).success(function(data) {
      $scope.conversation.userResult = data;
      if($scope.debug) console.log($scope.conversation);
    });
  };

  // Adding a user to a conversation
  $scope.addToConversation = function(user) {
    $scope.mainConversation.users.push(user);
  };

  // ----- SENDING MESSAGES in the focused main conversation ---- //
  $scope.sendMessage = function() {
    if (!$scope.mainConversation._id) {
      messenger.createConversation($scope.mainConversation).then(function(data) {
        $scope.mainConversation._id = data._id;
        postMessage();
      });
    } else {
      postMessage();
    }
  };
  
  function postMessage () {
    messageSocket.emit('message', $scope.user.handle, $scope.newmessage.body);
    messenger.postMessage($scope.mainConversation, $scope.newmessage).then(
      // success
      function(data) {
        $scope.mainConversation.messages.push(data);
        $scope.mainConversation.latest = data;
        $scope.newmessage.body = null;
      },
      // error
      function(error) {
      }
    );
    $scope.addUserModal = false;
  }

  // ----- RECEIVING MESSAGES in realtime via socket.io ----- //
  $scope.$on('socket:broadcast', function (event, data) {
    console.log('got a message', event.name, data);
    if (!data.payload) {
      console.log('invalid message | event', event, 'data', JSON.stringify(data));
      return;
    }
    $scope.$apply(function() {
      // $scope.mainConversation.messages.push(new Message(data));
    });
  });








  // ----- HELPER FUNTIONS ----- //
  $scope.isSelf = function(user_id) { return user_id === $scope.user._id; };

  $scope.otherPeople = function(conversation) {
    var others = angular.copy(conversation.users, others);
    angular.forEach(others, function(user, i) {
      if ($scope.isSelf(user._id)) {
        others.splice(i, 1);
      }
    });
    angular.forEach(others, function(user, i) {
      others[i] = user.f_name + ' ' + user.l_name;
    });
    return others.join(', ');
  };


});
