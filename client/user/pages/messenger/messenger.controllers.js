/*  ----------------------  *
    CONTROLLER - MESSENGER
 *  ----------------------  */

/* $scope.conversation at the level of the controller is focused convo
/* --> user initializes new blank conversation
/* --> when a conversation is focused from list, defaults to [0]th one
/* ---------------------------- */

app.controller('MessengerCtrl', function ($scope, messenger, settings, users, Conversation) {
  // $scope.debug = true;

  $scope.users = users.getAllButSelf();

  // get all of user's metadata
  users.get($scope.user._id).then(function(data) {
    console.log(data);
    angular.extend($scope.user, data);
    $scope.newmessage = { user: $scope.user._id, handle: $scope.user.handle, f_name: $scope.user.f_name, l_name: $scope.user.l_name };
  });


  // get all conversations
  $scope.conversations = messenger.conversations || [];


  // sets the focus and marks read timestamps for messages
  $scope.focusConversation = function(conversation) {
    $scope.mainConversation = conversation;
    messenger.readMessages(conversation);
  };

  $scope.initConversation = function() {
    // only init a new convo if not already in that mode
    if (!$scope.mainConversation || !$scope.mainConversation.new) {
      $scope.addUserModal = true;
      $scope.conversations.unshift(new Conversation());
      $scope.focusConversation($scope.conversations[0]);
      $scope.mainConversation.users.push($scope.user);
    } 
  };

  $scope.cancelNewConversation = function() {
    $scope.conversations.splice(0, 1);
    $scope.focusConversation($scope.conversations[0]);
  };

  // if ($scope.conversations.length === 0) {
    // console.log('no convos yet');
    // $scope.initConversation();
  // } else {
    $scope.focusConversation($scope.conversations[0]);
  // }

  $scope.createMessage = function() {
    if (!$scope.mainConversation._id) {
      messenger.createConversation($scope.mainConversation).then(function(data) {
        $scope.mainConversation._id = data._id;
        postMessage();
      });
    } else {
      postMessage();
    }
  };

  var postMessage = function() {
    $scope.newmessage.conversation = $scope.mainConversation._id;
    messenger.createMessage($scope.mainConversation, $scope.newmessage).then(
      // success
      function(data) {
        $scope.mainConversation.messages.push(data);
        $scope.mainConveration.latest = data;
        $scope.newmessage.body = null;
      },
      // error
      function(error) {

      }
    );
    $scope.addUserModal = false;
  };

  $scope.isSelf = function(user_id) {
    return user_id === $scope.user._id;
  };

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

  $scope.searchUsers = function() {
    users.search($scope.conversation.userQuery).success(function(data) {
      $scope.conversation.userResult = data;
      console.log($scope.conversation);
    });
  };

  $scope.addToConversation = function(user) {
    $scope.mainConversation.users.push(user);
  };

});
