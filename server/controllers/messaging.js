//Declarations
var 
  mongoose = require('mongoose'),
  Conversation = mongoose.model('Conversation'),
  Message = mongoose.model('Message');




//Methods
exports.getConversations = function(req, res, next) {
	// req.params.start
	// req.params.end
	Conversation.find({}, function (err, conversations) {
		if (err) { return next(err); }
		res.json(conversations);
	});
};

exports.getConversationById = function(req, res, next) {
	// req.params.id
	Conversation.findOne({ _id: req.param.id })
	.populate('users')
	.populate('messages')
	.exec(function(err, conversation) {
    if (err) { return next(err); }
    res.json(conversation);
  });

};

exports.createConversation = function(req, res, next) {
	var
	  convo = new Conversation(),
		user;
	User.findOne({"_id": "55516bb7c6e27c7d1a097473"}, function(err, u) {
		user = u;
		convo.users = [u._id];
		console.log(user);
	});

	convo.save(function(err, convo) {
    if (err) { return next(err); }
		res.json(convo);
	});

};

exports.createMessage = function(req, res, next) {
  var message = new Message(req.body);
  message.author = req.payload.username;

  message.save(function(err, message){
    if (err) { return next(err); }
    res.json(message);
  });
};
