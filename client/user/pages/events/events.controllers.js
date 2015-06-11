app.controller('EventsCtrl', function($scope, users, events, Event) {


  $scope.events        = events.events;
  $scope.eventTitles   = events.titles;
  $scope.isMine        = users.isCreator;

  $scope.event = new Event();
  // Initialize a brand new item from Item constructor
  $scope.initEvent = function(type) {
    $scope.event = new Event(type);
  };

  // POST new item OR PUT changes to item
  // ultimate save button is in the directive that handles the item type
  $scope.saveEvent = function() {
    events.save($scope.event).then(
      function(data) {
        $scope.event = data;
        // mixpanel.alias($scope.user._id);
        mixpanel.identify($scope.user._id);
        mixpanel.track("Add Item",{"area":"events", "page":"events", "action":"create"});
       // mixpanel.track("Event Page: Added Item");
    }, function(err) {
      // deal with error for user in some way
    });
  };

  // PUT UPDATES - 

  // Initialize the edit state -- 
  $scope.editEvent = function(event) {
    $scope.event = event;
  };

  $scope.deleteEvent = function (event, index) {
    console.log('delete', event._id);
    if (popupService.showPopup('Are you sure you want to delete this event?')) {
      events.delete(event._id).then(function(data){
        console.log(data.message);
        $scope.events.splice(index, 1);
      });
    }
  };

  // for upvoting
  $scope.incrementUpvotes = function(events){
    events.upvoteEvent(event);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"event", "page":"event", "action":"upvote"});
    // mixpanel.track("Shop Page: Upvoted Comment");
  };  

});