//Declarations
var 
  mongoose = require('mongoose'),
  Conversation = mongoose.model('Conversation'),
  Message = mongoose.model('Message');




//Methods
exports.getConversations = function(res, req, next) {
	// req.params.start
	// req.params.end
	Conversation.find({}, function (err, conversations) {
		if (err) { return next(err); }
		res.json(conversations);
	});
};

exports.getConversationById = function(res, req, next) {
	// req.params.id
	Conversation.findOne({ _id: req.param.id }, function(err, convo) {

	return Q.all([
	  convo.populate('users', function(err, users) {
	    if (err) { return next(err); }
	  }),
	  convo.populate('messages', function(err, messages) {
	    if (err) { return next(err); }
	  })
  }).then(function() {
    console.log(convo);
    res.json(convo);
  });

};

exports.createConversation = function(res, req, next) {
	var convo = new Conversation(req.body);

	convo.save(function(err, convo) {
    if (err) { return next(err); }
		res.send(convo);
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
