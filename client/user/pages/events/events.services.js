app.factory('events', function($http, auth){
  var o = { 
    events: []
  };

  o.titles = {
    bootcamp    : 'Bootcamp',
    challenge   : 'Online Challenge',
    session     : 'Private Session'
  };

  // CREATE
  o.create = function(event) {
    return $http.post('/api/events', event, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      var extendedItem = angular.extend(res.data, event);
      o.items.push(extendedItem);
      return extendedItem;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  // READ - basic getting of data
  o.getAll = function() {
    return $http.get('/api/events').then(function(res){
      angular.forEach(res.data, function(event) {
        event = _flattenItem(event);
      });
      angular.copy(res.data, o.events);
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.get = function(event_id) {
    return $http.get('/api/event/' + event_id).then(function(res){
      var event = _flattenItem(res.data);
      console.log(event);
      return event;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.getMine = function() {
    return $http.get('/api/events?creator=' + auth.isThisUser())
    .then(function(res) {
      console.log(res);
      angular.forEach(res.data, function(event) {
        event = _flattenItem(event);
      });
      return res.data;
    });
  };

  o.isMine = function(event) {
    return event.creator._id === auth.isThisUser();
  };

  // HELPER FUNCTION
  function _flattenItem (event) {
    var subitem = event[event.type];
    for (var k in subitem) {
      if (subitem.hasOwnProperty(k) && subitem[k] !== subitem._id) {
        event[k] = subitem[k];
        event[item.type] = subitem._id;
      }
    }
    return event;
  }

  // UPDATE

  o.update = function(event) {
    return $http.put('/api/event/' + event._id, event, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  o.upvote = function(event) {
    return $http.put('/api/event/' + item._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      event.upvotes += 1;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  o.addTransaction = function(id, transaction) {
    return $http.post('/api/event/' + id + '/transactions', transaction, {
      headers: {Authorization: 'Bearer '+transactions.getToken()}
    }).then(function(res){
      transactions.push(res.data);
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  };

  // DELETE
  o.delete = function(event_id) {
    return $http.delete('/api/event/' + event_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      console.log('Successfully deleted event.');
      return res.data;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
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
