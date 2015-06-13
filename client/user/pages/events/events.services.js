app.factory('events', function($http, auth){
  var o = { 
    events: []
  };

  o.titles = {
    bootcamp    : 'Bootcamp',
    challenge   : 'Online Challenge',
    session     : 'Private Session'
  };


  // READ - basic getting of data
  o.getAll = function(type) {
    // query string if we got a type, else blank
    var queryString = type? '?type=' + type : '';
    return $http.get('/api/events' + queryString)
    .then(_eventsSuccessHandler).catch(_eventErrorHandler);
  };

  o.get = function(event_id) {
    return $http.get('/api/event/' + event_id)
    .then(_eventSuccessHandler)
    .catch(_eventErrorHandler);
  };

  o.getMine = function() {
    return $http.get('/api/events?creator=' + auth.isThisUser())
    .then(_eventsSuccessHandler).catch(_eventErrorHandler);
  };

  // CREATE or UPDATE
  o.save = function(event) {
    console.log('saving', event);
    if (!event._id) {
      return $http.post('/api/events', event, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(_eventSuccessHandler).catch(_eventErrorHandler);
    } else {
      return $http.put('/api/event/'+event._id, event, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(_eventSuccessHandler).catch(_eventErrorHandler);
    }
  };

  o.upvote = function(event) {
    return $http.put('/api/event/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      event.upvotes += 1;
    }).catch(_eventErrorHandler);
  };

  // DELETE
  o.delete = function(event_id) {
    return $http.delete('/api/event/' + event_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      console.log('Successfully deleted event.');
      return res.data;
    }).catch(_eventErrorHandler);
  };

 // INTERNAL HELPER FUNCTIONS

  // -- result handlers --
  // plural
  var _eventsSuccessHandler = function(res) {
    angular.copy(res.data, o.events);
    return res.data;
  };

  // singular
  var _eventSuccessHandler = function(res) {
    o.event = res.data;
    return res.data;
  };

  var _eventErrorHandler = function(err) {
    console.log('failure');
    return err;
  };

  return o;

}); // </END OF EVENTS FACTORY>



/// CONSTRUCTOR OF NEW ITEMS
app.factory('Event', function() {

  var EventConstructor = function EventConstructor (type) {
    this.name         = null;
    this.creator      = { username: null, _id: null };

    this.price        = null;
    this.upvotes      = null;

    this.type         = type || null;
  };

  return EventConstructor;

});
