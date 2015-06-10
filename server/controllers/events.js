
var mongoose = require('mongoose');
var extend = require('util')._extend;
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];

//   Bootcamp: function(err, item) {
//     var bootcamp = new Bootcamp(item);
//     bootcamp.item = [item._id];
//     bootcamp.save(function (err, bootcamp) {
//       if(err){ return next(err); }
//       return bootcamp;
//     });
//   },
//   Challenge: function(err, item) {
//     var challenge = new Challenge(item);
//     challenge.item = [item._id];
//     challenge.save(function (err, challenge) {
//       if(err){ return next(err); }
//       return challenge;
//     });
//   },
// };
  // bootcamp: function(event) {
  //   return new Bootcamp(event);
  // }
