
app.directive('conversationAddUsers', function() {
  return {
    restrict: 'E',
    controller: 'MessengerCtrl',
    scope: false,
    template: '<div class="col-sm-12">' +
                // '<form name="userSearchForm" class="form-horizontal" ng-submit="findUsers()" novalidate/>' +
                  // '<div class="form-group">' + 
                    // '<input type="text" class="form-control" placeholder="Search" ng-model="conversation.userQuery" ng-blur="searchUsers()">' +
                  // '</div>' +
                // '</form>' +
                '<div ng-repeat="user in users | orderBy:\'username\'" ng-click="addToConversation(user)">' +
                  '<i class="fa fa-plus"></i> {{user.handle || user.username}} {{user.f_name + \' \' + user.l_name}}' +
                '</div>' +
                '<div class="col-sm-12" ng-repeat="user in conversation.userResult">' +
                  '<div class="col-sm-1">Pic</div>' +
                  '<div class="col-sm-10">{{user.handle}} | {{user.f_name}} {{user.l_name}}</div>' +
                  '<div class="col-sm-1"> </div>' +
                '</div>' +
              '</div>',
    link: function(scope, element, attrs) {}
  };
});

