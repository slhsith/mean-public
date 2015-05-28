// Module Dependencies
var 
  mongoose = require('mongoose');

// --- Models --- //
var
  Conversation = mongoose.model('Conversation'),
  Timestamp = mongoose.model('Timestamp'),
  User = mongoose.model('User'),
  Message = mongoose.model('Message');



// --- Exported Methods --- //
exports.getConversations = function(req, res, next) {
	// req.params.start
	// req.params.end
	Conversation.find({users: req.payload._id}, '-__v -latest.user')
  .populate('messages', 'body user handle f_name l_name time_sent time_read -id')
  .populate('users', 'handle username f_name l_name')
  .sort('latest.time_sent')
  .exec(function (err, conversations) {
    User.populate(conversations, {path: 'messages.time_read.user', select: 'f_name l_name -_id'}, function(err, convo) {
      if (err) { return next(err); }
      res.json(conversations);
    });

		// if (err) { return next(err); }
	});
};

exports.getConversationById = function(req, res, next) {
	// req.params.id
	Conversation.findOne({ _id: req.params.id }, '-__v')
  .populate('messages', 'handle body user f_name l_name time_sent time_read -_id')
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

exports.createMessage = function(io) {
  return function(req, res, next) {
    var message = new Message(req.body);
    console.log(req.body);

    message.save(function(err, message) {
      if (err) { return next(err); }
      Conversation.findByIdAndUpdate(req.params.id, {$push: {messages: message._id}, $set: {latest: req.body }}, function(err, convo) {
        if (io) io.sockets.emit('convoUpdated', convo);
      });
      return res.json(message);
    });
  };
};

exports.readMessages = function(req, res, next) {
  var user_id = req.body.user;
  var _id = mongoose.Types.ObjectId(req.body.user);
  var convo_id = req.params.id;
  var timestamp = new Timestamp(req.body);
  console.log(user_id + ' is reading messages for conversation ' + convo_id + ' will add timestamp ' + timestamp );

  Message.update(
    { conversation: convo_id, users_read: {$nin: [user_id]}},
    { $push: { time_read: timestamp, users_read: user_id } },
    { multi: true }, function(err, messages) {
      console.log('updated timestamps', messages);
      return res.json({message: 'Successfully updated time_read for user ' + user_id })
    });


};
