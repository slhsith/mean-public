/* users
 * { _id: user_id,
     socket_id: 
  
 }

 */
var jwt = require('jsonwebtoken');
/* { user_id: socket } */
var mongoose = require('mongoose');
var Conversation = mongoose.model('Conversation');

module.exports = function (io) {
  io.usersockets = {};
  'use strict';
  io.on('connection', function (socket) {

    console.log('#################################################');
    console.log('Socket attempting to connect ' + socket.id );
    socket.auth = false;

    socket.emit('tokenrequest', {'message': 'Server expecting token: JWT'});

    socket.on('authenticate', function(data) {
      jwt.verify(data.token, 'SECRET', function(err, decoded) {      
        if (!err && decoded) {
          console.log("Authenticated socket for " + decoded.username, socket.id, decoded._id);
          socket.auth = true;
          io.usersockets[decoded._id] = socket;
          Conversation.find({users: decoded._id})
          .stream()
          .on('data', function(convo) {
            socket.join(convo._id.toString(), function() {
              console.log('rooms', socket.rooms);
            });
          })
          .on('close', function() {
            setTimeout(function() {
              socket.emit('broadcast', {
                'message': decoded.username + ' authenticated socket [' + socket.id + ']',
                'rooms': socket.rooms
              });
            }, 3000);
          });
        } else {
          console.log("Failed to authenticate socket ", socket.id);
          socket.broadcast.emit('reject', {success: false, message: 'Failed to authenticate token.' }); 
        }
      });
    });

    setTimeout(function() {
      if (!socket.auth) {
        console.log("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, 1000);


    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));
      console.log('broadcasting message payload', msg);
      io.sockets.emit('conversation', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });


  });
};


