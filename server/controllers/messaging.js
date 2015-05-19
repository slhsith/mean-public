// Module Dependencies
var 
  mongoose = require('mongoose');

// --- Models --- //
var
  Conversation = mongoose.model('Conversation'),
  Message = mongoose.model('Message');


// --- Exported Methods --- //
exports.getConversations = function(req, res, next) {
	// req.params.start
	// req.params.end
	Conversation.find({})
  .populate('messages')
  .populate('users')
  .exec(function (err, conversations) {

		if (err) { return next(err); }
    console.log()
		res.json(conversations);
	});
};

exports.getConversationById = function(req, res, next) {
	// req.params.id
	Conversation.findOne({ _id: req.params.id })
	.populate('users')
	.populate('messages')
	.exec(function(err, conversation) {
    if (err) { return next(err); }
    res.json(conversation);
  });

};

exports.createConversation = function(req, res, next) {
	var convo = new Conversation();
  convo.users = [req.payload._id];

	convo.save(function(err, convo) {
    if (err) { return next(err); }
		res.json(convo);
	});

};

exports.createMessage = function(req, res, next) {
  console.log('message for', req.body, req.payload);
  var message = new Message(req.body);
  // message.user = req.payload._id;
  // message.conversation = req.params.id;

  message.save(function(err, message) {
    if (err) { return next(err); }
    Conversation.findByIdAndModify(req.params.id, {$push: {messages: message._id}}, function(err, convo) {

    });
    return res.json(message);
  });
};
