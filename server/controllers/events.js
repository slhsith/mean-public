/* -----------------------------------------------------
   Events
   ----------------------------------------------------- */

// --- Module Dependencies --- //
var mongoose = require('mongoose');
var extend = require('util')._extend;
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];

// --- Models --- //
var
  User          = mongoose.model('User'),
  Event         = mongoose.model('Event'),

  Bootcamp      = mongoose.model('Bootcamp'),
  Challenge     = mongoose.model('Challenge'),
  Session       = mongoose.model('Session');

var subEventInstantiation = {
  bootcamp  : function(item) { return new Bootcamp(item); },
  challenge : function(item) { return new Challenge(item); },
  session   : function(item) { return new Session(item); }
};
var subEventModel = {
  bootcamp: Bootcamp,
  challenge: Challenge,
  session: Session 
};

// --- Exported Methods --- //

// ----------------------------- ITEMS --------------------------------- //
exports.getEvents = function(req, res, next) {
  var query = {};
  if (req.query.creator) { query = {'creator._id': req.query.creator}; }
  if (req.query.type)    { query = {'type': req.query.type}; }

  Event.find(query)
   .populate('bootcamp challenge session')
   .exec(function(err, events){
      console.log('--events', events);
      if(err){ return next(err); }
      events.forEach(function(event) {
        (_flattenEvent(event));
      });
      return res.json(result);
   });
};


/* ---------- EVENT is a signupable thing in the system
---- Properties ----
 name: String
 upvotes: Number
 creator: { _id, username} from req.payload
 price: Number (dollar amount x 100 = cents)
 type: various subtypes | bootcamp session challenge

---- Refs ----
 in the creator   &   <subtype> : subtype._id

 To create new event, must
    1) saveEvent: Event.save
    2) saveSubEvent: SubEvent.save with event: event._id reference included
    3) updateEvent: update Event with refence to SubType
    4) updateUser: update User with event._id
 */
exports.postEvent = function(req, res, next) {
  var event = new Event(req.body);
  event.creator = req.payload;
  var subitem = subEventInstantiation[event.type](req.body);
  var user = { _id: req.payload._id };
  _saveEvent(event, function(err, event) {
    _saveSubEvent(err, event, subevent, function(err, event, subevent) {
      _updateEventWithSubeventId(err, event, subevent, function(err, event, subevent) {
        User.findByIdAndUpdate(
          req.payload._id,
          { $push: { events: event._id } },
          { new: true },
          function(err, user) {
            if (err) { return next(err); }
            console.log('------>EVENT', event.type, event._id);
            console.log('------>USER EVENTS', user.events);
            event[event.type] = subevent._id;
            console.log('------>RESULT', event);
            return res.json(_flattenEvent(event));
          }
        );
      });
    });
  });
};
// INTERNAL HELPER FUNCTIONS for POST ITEM
function _saveEvent (event, callback) {
  event.save(function (err, event) {
    if (err) { return next(err); }
    console.log('------> event after saving', event);
    callback(null, event);
  });
}
function _saveSubItem (err, event, subevent, callback) {
  subevent.item = event._id;
  subevent.save(function(err, subevent) {
    if(err){ return next(err); }
    callback(null, event, subevent);
  });
}
function _updateEventWithSubeventId (err, event, subevent, callback) {
  // this will be the update needed, matching the type of the event 
  // e.g. { $set : { 'bootcamp' : bootcamp._id }} 
  var update = {};
  update[event.type] = subevent._id;
  Event.findByIdAndUpdate(
    event._id, 
    { $set : update },
    { new: true },
    function(err, event) {
      if (err) { return next(err); }
      callback(null, event, subevent);
  });
}

/*   in the front end, our items are flattened with the format
 *   { _id       : event_id,
 *     <subtype> : subevent_id, ... }
 *   We will want to update the subitem with the _id swapped to 
 *   { _id       : subevent_id, 
 *     event     : event_id, ... }                               */
exports.updateEvent = function(req, res, next) {
  var type = req.body.type;
  var subevent_id = req.body[type];
  var model = subItemModel[type];

  // might need to update price/name in Event object??
  // Event.findByIdAndUpdate(
    // req.body._id,
    // req.body, 
    // function(err, item) {
      // if (err) { return next(err); }
      swapIds(req.body);
      model.findByIdAndUpdate(
        subevent_id,
        req.body,
        {new: true},
        function(err, subevent) {
          if (err) { return next(err); }
          return res.json(_flattenEvent(subevent));
      });
    // }
  // );
};

exports.getEventById = function (req, res, next) {
 var event_id = req.params.event;
 Event.findById(event_id)
 .populate('bootcamp session challenge')
 .exec(function(err, event) {
    if (err) { return next(err); }
    console.log('----> populated\n', event);
    if (event) {
      return res.json(_flattenEvent(event));
    } else {
      return res.json({message: 'no event found'});
    }
 });
};

exports.upvoteEvent = function(req, res, next) {
  Event.update(
    {_id: req.params.event},
    {$inc: {upvotes: 1}},
    function(err, event){
      if (err) { return next(err); }
      res.json({'message': 'Upvote applied for event ' + req.params.event});
  });
};

exports.deleteEvent = function(req, res, next) {
  var event_id = req.params.event;
  Event.findByIdAndRemove(event_id, function (err, event) {
    if (err) { return next(err); }
    User.findByIdAndUpdate(
      req.payload._id,
      { $pull: {items: {_id: event_id} }}, 
      function (err, user) {
        if(err){ return next(err); }
        res.json({message: 'Successfully deleted event ' + event_id, success: true});
    });    
  });
};

// ---------------  HELPER FUNCTIONS ------------------- //
function _swapIds (event) {
  // this is an event, and we want Ids in <Subevent> format
  // with the main ObjectId(<subevent's _id>)
  if (!event.event) { // no ref back to event yet
    event.event       = event._id;   // event field gets event._id 
    event._id         = event[event.type]; // e.g. bootcamp_id is stored at event.type
  } else {
    event[event.type] = event._id; // item.Subitem gets subitem_id
    event._id         = event.event; // main ObjectId(<event's _id>)
  }
}

var types = ['bootcamp', 'challenge', 'session'];
function _flattenEvent(event) {
  event = event.toObject();
  types.forEach(function(type) {
    if (event[type] === null) {
      delete event[type];
    }
  });
  // move all fields in the subitem except ID to the first level hierarchy of object
  var subevent = event[event.type];
  var subevent_id = subevent._id;
  for (var key in subevent) {
    if (subevent.hasOwnProperty(key) && subevent[key] !== subevent_id) {
      event[key] = subevent[key];
    }
  }
  // finally flatten the subitem_id also
  event[event.type] = subevent_id;
  return event;
}
