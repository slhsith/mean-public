var 
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var FACEBOOK_APP_ID = "692480267528460"
var FACEBOOK_APP_SECRET = "5291485b14fff8e81428d10c9a0c164a";

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});  

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


passport.use(new FacebookStrategy({
    clientID: "692480267528460",
    clientSecret: "5291485b14fff8e81428d10c9a0c164a",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName', 'photos']
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, {f_name: first_name}, {l_name: last_name}, {email: email}, function (err, user) {
      return done(err, user);
    });
  }
));

