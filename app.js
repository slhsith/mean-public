var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var nodemailer = require('nodemailer');
var stripe = require('stripe')('sk_test_z1OaqEIX71PB6nqiDgZ8bfLE');
var http = require('http');

// MODELS
// posts
require('./server/models/Posts');
require('./server/models/Comments');

// shop
require('./server/models/Items');
require('./server/models/Videos');
require('./server/models/Books');
require('./server/models/Podcasts');
require('./server/models/Transactions');
require('./server/models/Customers');
require('./server/models/DietPlans');

// user and groups
require('./server/models/Users');
require('./server/models/Languages');
require('./server/models/Groups');
require('./server/models/Gposts');
require('./server/models/Gcomments');
require('./server/models/Followers');

// messaging
require('./server/models/Messages');
require('./server/models/Conversations');

// API CONTROLLERS 
require('./server/controllers/authentication');
require('./server/controllers/settings');
require('./server/controllers/posts');
require('./server/controllers/shop');
require('./server/controllers/groups');
require('./server/controllers/messaging');
require('./server/controllers/settings');

// CONFIG
require('./server/config/passport');



mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/news');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


var routes = require('./server/routes/index');
var users = require('./server/routes/users');

var app = express();

var jsonParser = bodyParser.json();

// socket.io
app.io = require('socket.io')();
require('./server/config/socketio')(app.io);



/**
 * Enable CORS (http://enable-cors.org/server_expressjs.html)
 * to allow different clients to request data from your server
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
  res.status(err.status || 500, 400, 401, 403, 404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: '/client/404.html' });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;
