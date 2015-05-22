var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username);
    console.log(password);
    User.findOne({ 'username': username }, function (err, user) {
      // if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.authenticate(new FacebookStrategy({
    clientID: "692480267528460",
    clientSecret: "5291485b14fff8e81428d10c9a0c164a",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

