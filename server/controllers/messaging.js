// Module Dependencies
var 
  app = require('../../app'),
  mongoose = require('mongoose');

// --- Models --- //
var
  Conversation = mongoose.model('Conversation'),
  Timestamp = mongoose.model('Timestamp'),
  User = mongoose.model('User'),
  Message = mongoose.model('Message');



// --- Exported Methods --- //
exports.getConversations = function(req, res, next) {
	Conversation.find({users: req.payload._id }, '-__v')
  .populate('users', 'handle username f_name l_name')
  .limit(10)
  .sort('latest.time_sent')
  .exec(function (err, conversations) {
    if (conversations.length === 0) return res.json([]);
    getLatestMessagesById(conversations[0]._id, 0, 30)
    .exec(function(err, messages) {
      conversations[0].messages = messages || [];
      return res.json(conversations);
    });
	});
};

exports.getConversationById = function(req, res, next) {
	console.log('--GET-----> grabbing convo for ' + req.params.id);
  getLatestMessagesById(req.params.id, 0, 30)
	.exec(function(err, messages) {
    console.log('--GET---->messages for convo_id' + req.params.id + '\n',
    messages);
    // if (err) { return next(err); }
    return res.json(messages);
  });
};

function getLatestMessagesById (convo_id, start, count) {
  return Message.find({'convo_id': convo_id})
  .sort({time_sent: -1})
  .skip(start)
  .limit(count);
}

exports.getConversationsForUser = function(req, res, next) {
  var user_id = req.params.id;
  paginateUserConvos(user_id, 0, 100)
  .exec(function(err, convos) {
    return res.json(convos);
  });
}

function paginateUserConvos (user_id, start, count) {
  return Conversation.find({users: user_id})
  .skip(start)
  .limit(count);
}

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
    req.body.users.forEach(function(user_id) {
      if (req.io.usersockets[user_id]) {
        req.io.usersockets[user_id].join(convo._id.toString(), function() {
          publishToConvo(req, convo._id,
            'newconversation',
            'Newly created conversation for ' + convo._id,
            {convo: convo, initiator: req.payload._id}
          );
          console.log(user_id + ' subscribed to room for convo ' + convo._id);
          console.log(req.io.usersockets[user_id].rooms);
        });
      }
    });
		return res.json(convo);
	});
};


exports.createMessage = function(req, res, next) {
  var message = new Message(req.body);
  message.convo_id = req.params.id;
  message.user_id = req.payload._id;

  message.save(function(err, message) {
    // if (err) { return next(err); }
    Conversation.findByIdAndUpdate(
      req.params.id, 
      {$set: {latest: message }},
      {new: true}, // returns new value for convo
      function(err, convo) {
        publishToConvo(req,
          message.convo_id,
          'newmessage',
           message.f_name + ' sent message for ' + message.convo_id,
           message
          );

        // req.io.in(message.convo_id)
        // // req.io.usersockets[message.user_id].to(message.convo_id)
        // .emit('newmessage', {
        //   'message': message.f_name + ' sent message for ' + message.convo_id,
        //   'payload': message
        // });
        return res.json(message);
    });
  });
};

exports.readMessages = function(req, res, next) {
  var user_id = req.body.user_id;
  var convo_id = req.params.id;
  var timestamp = new Timestamp(req.body);
  console.log('--PUT----->]'
              + user_id + '] reading messages for conversation [' 
              + convo_id + '] Adding timestamp ' + timestamp );

  Message.update(
    { 'convo_id': convo_id, user_id: {$ne: user_id}, 'time_read.user_id': {$nin: [user_id] } },
    { $push: { time_read: timestamp} },
    { multi: true }, 
    function(err, messages) {
      publishToConvo(req, convo_id, 'readmessages', 'messages read for convo' + convo_id, {_id: convo_id});
      console.log('-----> updated timestamps for ' + messages.length + 'messages', messages);
      return res.json({message: 'Successfully updated time_read for user ' + user_id })
    });
};


// helper function - publish to conversation room subscribers
function publishToConvo(req, convo_id, type, message, payload) {
  req.io.in(convo_id).emit(type, {
    'message': message,
    payload: payload,
  });
};
