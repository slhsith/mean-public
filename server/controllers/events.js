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

  Challenge     = mongoose.model('Challenge');


// --- Exported Methods --- //

// ----------------------------- ITEMS --------------------------------- //
exports.getEvents = function(req, res, next) {
  var query = {};
  if (req.query.creator) { query = {'creator._id': req.query.creator}; }
  if (req.query.type)    { query = {'type': req.query.type}; }

  Event.find(query)
   .populate('challenge')
   .exec(function(err, events){
      console.log('--events', events);
      if(err){ return next(err); }
      return res.json(events);
   });
};


/* ---------- EVENT is a signupable thing in the system
 To create new event, must
    1) saveEvent: Event.save
    2) updateUser: update User with event._id         */
exports.postEvent = function(req, res, next) {
  var event = new Event(req.body);
  event.creator = req.payload;
  event.save(function(err, event) {
    User.findByIdAndUpdate(
      req.payload._id,
      { $push: { events: event._id } },
      { new: true },
      function(err, user) {
        if (err) { return next(err); }
        console.log('------>EVENT', event.type, event._id);
        console.log('------>USER EVENTS', user.events);
        return res.json(event);
    });
  });
};

/*   in the front end, our items are flattened with the format
 *   { _id       : event_id,
 *     <subtype> : subevent_id, ... }
 *   We will want to update the subitem with the _id swapped to 
 *   { _id       : subevent_id, 
 *     event     : event_id, ... }                               */
exports.updateEvent = function(req, res, next) {
  var type = req.body.type;

  Event.findByIdAndUpdate(
    req.body._id,
    req.body, 
    {new: true},
    function(err, item) {
      if (err) { return next(err); }
      return res.json(event);
  });
};

exports.getEventById = function (req, res, next) {
 var event_id = req.params.event;
 Event.findById(event_id)
 .populate('bootcamp session challenge')
 .exec(function(err, event) {
    if (err) { return next(err); }
    console.log('----> populated\n', event);
    if (event) {
      return res.json(event);
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

