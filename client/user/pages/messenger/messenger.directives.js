// app.directive('conversationUsers', function() {
//   return {
//     restrict: 'E',
//     controller: 'MessengerCtrl',
//     // replace: true,
//     template: '<div>To: <span ng-repeat="user in conversation.users" style="background-color: lightgray; padding: 5px; border-radius: 3px">{{user.username}}</span></div>',
//     link: function(scope, element, attrs) {
//     }
//   };
// });

app.directive('latestMessage', function() {
  return {
    // controller: function() {
    //   var self = this;
    //   self.init = function(element) {
    //     self.$element = element;
    //   };
    // },
    // transclude: true,
    scope: {
      conversation: '=latestMessage'
    },
    template: '<div class="col-sm-12">From: {{conversation.messages[ conversation.messages.length - 1].user}} <br/>{{conversation.messages[ conversation.messages.length - 1 ].body | limitTo: 40}}</div>',
  };
});

// app.directive('conversationAddUsers', function() {
//   return {
//     restrict: 'E',
//     controller: 'MessengerCtrl',
//     template: '<div class="col-sm-12">' +
//                 '<form name="userSearchForm" class="form-horizontal" ng-submit="findUsers()" novalidate/>' +
//                   '<div class="form-group">' + 
//                     '<input type="text" class="form-control" placeholder="Search" ng-model="conversation.userQuery" ng-blur="searchUsers()">' +
//                   '</div>' +
//                 '</form>' +
//                 '<div ng-repeat="user in users | orderBy:\'username\'" ng-click="addToConversation(user)">' +
//                   '{{user.f_name || user.handle || user.username}} | {{user._id}}' +
//                 '</div>' +
//                 '<div class="col-sm-12" ng-repeat="user in conversation.userResult">' +
//                   '<div class="col-sm-1">Pic</div>' +
//                   '<div class="col-sm-10">{{user.handle}} | {{user.f_name}} {{user.l_name}}</div>' +
//                   '<div class="col-sm-1"> </div>' +
//                 '</div>' +
//               '</div>'
//     link: function(scope, element, attrs) {}
//   };
// });

