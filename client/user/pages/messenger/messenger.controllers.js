/*  ----------------------  *
    CONTROLLER - MESSENGER
 *  ----------------------  */

/* $scope.conversation at the level of the controller is focused convo
/* --> user initializes new blank conversation
/* --> when a conversation is focused from list, defaults to [0]th one
/* ---------------------------- */

app.controller('MessengerCtrl', function ($scope, settings, users, messenger, messengerSocket, Conversation, Message) {

  $scope.debug = true;

  // ----- SET UP PREREQUISITE SCOPE VARIABLES  -----

  // for selecting users to talk to
  $scope.users = users.getAllButSelf();

  // get all of user's metadata and extend scope user object
  users.get($scope.user._id).then(function(res) {
    angular.extend($scope.user, res.data);
    // set up metadata on the newmessage object
    $scope.newmessage = new Message($scope.user);
  });

  // get all conversations
  $scope.conversations = messenger.conversations || [];



  // ------ METHODS FOR CONVERSATIONS ------ //

  // Set the focus on a particular conversation
  // establishes the conversation._id in the newmessage
  // marks read timestamps for messages
  $scope.focusConversation = function(conversation) {
    $scope.mainConversation = conversation;
    $scope.newmessage.conversation = conversation._id;
    if (!conversation.new) messenger.readMessages(conversation);
  };

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
    messenger.createMessage($scope.mainConversation, $scope.newmessage).then(
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




  // ---- INIT MODULE ----  //

  if ($scope.conversations.length > 0) {
    if($scope.debug) console.log('we got a convo to see');
    $scope.focusConversation($scope.conversations[0]);
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
