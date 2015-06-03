var 
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var FACEBOOK_APP_ID = "692480267528460"
var FACEBOOK_APP_SECRET = "5291485b14fff8e81428d10c9a0c164a";




passport.use(new FacebookStrategy({
    clientID: "692480267528460",
    clientSecret: "5291485b14fff8e81428d10c9a0c164a",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName', 'photos']
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

    User.findOne({facebookId: profile.id}, function (err, user) {

      if (err) {
        return done(err);
      }

      if (user) {

        return done(null, user);

      } else {

        var data = {
          facebookId: profile.id,
          f_name: profile.first_name,
          l_name: profile.last_name,
          username: profile.email
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.username = profile.emails[0].value;
        }

        User.create(data, function (err, user) {
          return done(err, user);
        });
      }
    });
    });
  }));

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