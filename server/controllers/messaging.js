// Module Dependencies
var 
  mongoose = require('mongoose');

// --- Models --- //
var
  Conversation = mongoose.model('Conversation'),
  Timestamp = mongoose.model('Timestamp'),
  Message = mongoose.model('Message');


// --- Exported Methods --- //
exports.getConversations = function(req, res, next) {
	// req.params.start
	// req.params.end
	Conversation.find({users: req.payload._id}, '-__v')
  .populate('messages', 'handle body user timesent timeread -_id')
  .populate('users', 'handle username f_name l_name')
  .exec(function (err, conversations) {

		if (err) { return next(err); }
		res.json(conversations);
	});
};

exports.getConversationById = function(req, res, next) {
	// req.params.id
	Conversation.findOne({ _id: req.params.id }, '-__v')
  .populate('messages', 'handle body user timesent timeread -_id')
  .populate('users', 'handle username f_name l_name -_id')
	.exec(function(err, conversation) {
    if (err) { return next(err); }
    res.json(conversation);
  });

};

exports.createConversation = function(req, res, next) {
  // users might be an array of objects or just _id numbers
  if (typeof req.body.users[0] === 'Object') {
    var userObjects = req.body.users;
    req.body.users = [];
    userObjects.forEach(function(user) {
      req.body.users.push(user._id);
    });
  }
	var convo = new Conversation(req.body);

	convo.save(function(err, convo) {
    if (err) { return next(err); }
		res.json(convo);
	});

};

exports.createMessage = function(req, res, next) {
  var message = new Message(req.body);

  message.save(function(err, message) {
    // if (err) { return next(err); }
    Conversation.findByIdAndUpdate(req.params.id, {$push: {messages: message._id}, $set: {latest: req.body }}, function(err, convo) {

    });
    return res.json(message);
  });
};

exports.readMessages = function(req, res, next) {
  var user_id = req.body.user;
  var _id = mongoose.Types.ObjectId(req.body.user);
  console.log('===================' + user_id + '\n================'+ _id)
  var convo_id = req.params.id;
  var timestamp = new Timestamp(req.body);
  console.log(user_id + ' is reading messages for conversation ' + convo_id );

  Message.find({conversation: convo_id})
  .limit(100)
  .exec(function(err, messages) {
    messages.forEach(function(message) {
      message.update(
        {timeread: {$nin: [ {user: user_id} ] }},
        {'$push': { timeread: timestamp } },
        function() {
        console.log('-------message', message);
      });
    });
    res.json(timestamp);
  });

};
