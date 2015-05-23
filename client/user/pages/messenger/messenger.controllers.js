/*  ----------------------  *
    CONTROLLER - MESSENGER
 *  ----------------------  */

/* $scope.conversation at the level of the controller is focused convo
/* --> user initializes new blank conversation
/* --> when a conversation is focused from list, defaults to [0]th one
/* ---------------------------- */

app.controller('MessengerCtrl', function ($scope, messenger, settings, users, usersPromise) {

  $scope.conversations = messenger.conversations;
  // $scope.user = angular.extend($scope.user, settings.settings);
  $scope.users = users.users;
  $scope.conversation = $scope.conversations[0];

  $scope.createConversation = function() {
    $scope.conversation = { users: [] };
  };

  $scope.createMessage = function() {
    var message = $scope.conversation.message;
    message.user = $scope.user._id;
    message.handle = $scope.user.handle;
    message.conversation = $scope.conversation._id;
    messenger.createMessage($scope.conversation, $scope.conversation.message).success(function(data) {
      $scope.conversation.messages.push(data);
    });

  };

  $scope.searchUsers = function() {
    users.search($scope.conversation.userQuery).success(function(data) {
      $scope.conversation.userResult = data;
      console.log($scope.conversation);
    });
  };

  $scope.addToConversation = function(user) {
    $scope.conversation.users.push(user._id);
  };

});
