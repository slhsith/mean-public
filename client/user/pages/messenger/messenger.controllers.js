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
  $scope.map = messenger.map || {};

  if ($scope.conversations.length > 0) {
    setFocus($scope.conversations[0]);
  } 

  // ------ METHODS FOR CONVERSATIONS ------ //


  // Set the focus on a particular conversation
  // establishes the conversation._id in the newmessage
  // marks read timestamps for messages
  $scope.focusConversation = setFocus;

  function setFocus(convo) {
    messenger.get(convo._id).success(function(data) {
      convo.messages = data;
    });
    $scope.mainConversation = convo;
    $scope.newmessage.conversation = convo._id;
    if (!convo.new) messenger.readMessages(convo);
  }

  // Starting a new conversation
  $scope.initConversation = function() {
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
        $scope.addUserModal = false;
        postMessage();
      });
    } else {
      postMessage();
    }
  };
  
  function postMessage () {
    messenger.postMessage($scope.mainConversation, $scope.newmessage).success(function() {
      $scope.newmessage.body = null;
    });
  }

  // ----- RECEIVING MESSAGES in realtime via socket.io ----- //
  $scope.$on('socket:newmessage', function (event, data) {
    console.log('got a new message', event.name, data);
    if (!data.payload) return;
      var latest = data.payload;
      $scope.$apply(function() {
        update(latest);
      });
  });


  function update (latest) {
    console.log('a new message for conversation ' + latest.convo_id);
    function unwrap (data, to) { to = data; }
    for (var i=0; i<$scope.conversations.length; i++) {
      if ($scope.conversations[i]._id === latest.convo_id) {
        var convo = $scope.conversations[i];
        convo.latest = latest;

        convo.messages = convo.messages || [];

        if (convo.messages.length === 0) {
          console.log('havent yet seen this conversation\'s messages, retrieving...');
          messenger.get(convo._id).success(unwrap(data, convo));
        } else {
          var newmessage = {};
          angular.copy(latest, newmessage);
          convo.messages.push(newmessage);
        }
        if ($scope.mainConversation._id === convo._id) {
          $scope.mainConversation = convo;
        }
        break;
      }
    }
  }



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
