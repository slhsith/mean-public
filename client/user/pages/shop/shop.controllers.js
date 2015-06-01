/*  ----------------------  *
    CONTROLLER - DIETPLAN
 *  ----------------------  */

/* 
/* ---------------------------- */
app.controller('DietCtrl', function ($scope, settings, users) {

  $scope.debug = true;

  // ---- INIT SCOPE ----  //


  // get all conversations

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
