/* -----------------------------------------------------
   creating and verifying login / authentication elements
   ----------------------------------------------------- */
//env
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];

// Module Dependencies
var 
	mongoose = require('mongoose'),
  stripe = require('stripe')(config['STRIPE_SECRET_KEY']),
	nodemailer = require('nodemailer'),
  passport = require('passport'),
	User = mongoose.model('User'),
	transporter = nodemailer.createTransport({
    service: 'Mandrill',
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: config['MANDRILL_USER'],
        pass: config['MANDRILL_PASSWORD']
    }
  });

// --- Models --- //
var
  User          = mongoose.model('User');

//Methods
exports.doRegistration = function(req, res, next) {
	console.log(req.body);
  var checkEmail = function () {
    User.findOne({ username: req.body.username }, function (err, user, next) {
      if (user){ console.log('email exists'); return true; }
      if (!user){ console.log('email doesnt exists'); return false; }
    });
  };
	if (!req.body.f_name || !req.body.l_name || !req.body.handle || !req.body.username || !req.body.password || !req.body.repeat_username || !req.body.repeat_password) {
		return res.status(400).json({message: 'Please fill out all fields'});
	} else if (req.body.username !== req.body.repeat_username) {
		return res.status(400).json({message: 'Emails do not match'});
	} else if (req.body.password !== req.body.repeat_password) {
		return res.status(400).json({message: 'Passwords do not match'});
	}

  User.findOne({ username: req.username}), function (err, user, next) {
    if (!user) { next(); }
    if (user) { res.status(400).json({message: 'Email in use'}); }
  }

	var user = new User();

  user.f_name = req.body.f_name;
  user.l_name = req.body.l_name;
  user.handle = req.body.handle;
	user.username = req.body.username;
	user.setPassword(req.body.password);
	user.generateUserToken();

	user.save(function (err){
		if (err) { next(err); }


		var mailOptions = {
			from: 'contact@trainersvault.com', // sender address 
			to: user.username, // list of receivers 
			subject: 'Welcome to Your New Profile!', // Subject line 
			generateTextFromHTML: true,
			html: '<div style="text-align: center">Please Click this link to verify your account!'
			+ '<br/><br/>Link: http://localhost:3000/set/#/emailverify/' + user.username + '/' + user.user_token
			+ '<br/><br/></br>Thank you for using Trainersvault!</div>'
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
			console.log(error);
			}else{
					console.log('Message sent: ' + info.response);
			}
		});
    var stripeToken = req.body.stripeToken; //generated by stripe.js
    stripe.customers.create({
      description: 'Stripe customer '+ req.body.f_name + ' ' + req.body.l_name,
      email: req.body.username,
      source: stripeToken 
    }, function (err, customer) {
      if(err) { return next(err); };
      User.findByIdAndUpdate(user._id, { $set: { stripe_id: customer.id } }, function (err, user) {
        if (err) { return next(err); }
        console.log('Stripe user created for ' + req.body.f_name + ' ' + req.body.l_name);
        res.json({token: user.generateJWT()});
      });
    });	
	});
};


exports.doLogin = function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate(['local', 'facebook'], function(err, user, info) {
    if (err) { next(err); }

    if (user) {
      res.json({token: user.generateJWT()});
    } else {
      res.status(400).json({message: 'The email or passwword you entered is wrong, please verfiy your information and try again'});
    }
  })(req, res, next);
};

exports.recoverPassword = function(req, res, next){
  if (!req.body.username) {
    res.status(400).json({message: 'Please enter an email'});
  }

  User.findOne({ username: req.body.username }, function (err, user) {
    if (!user) { res.status(400).json({message:'Email not found'}); }
    if (user) {

     var mailOptions = {
        from: 'contact@trainersvault.com', // sender address 
        to: user.username, // list of receivers 
        subject: 'Trainersvault Reset Password', // Subject line 
        generateTextFromHTML: true,
        html: '<div style="text-align: center">Please click this link to reset your password!'
            + '<br/><br/>Link: http://localhost:3000/set/#/resetpassword/' + user.username + '/' + user.user_token 
            + '<br/><br/><br/>Thank you for using Trainersvault!',
      }; 
      transporter.sendMail(mailOptions, function(error, info){
        if(error){ console.log(error);
        }else{console.log('Message sent: ' + info.response); }
      });

      res.json({'message': 'Password recovery email sent.'})
    }
  });

};

exports.verifyEmail = function (req, res, next) {
  User.findOne({ username: req.params.username, user_token: req.params.user_token })
  .exec(function (err, user) {
    if (!user) { return res.status(400).json({message:'Email not found'}); }
    user.validateUserEmailToken();
    user.generateUserToken();
    user.save(function (err){
      if(err){ return next(err); }
      return res.json({token: user.generateJWT()})
   });
  });
};

exports.getResetPassword = function (req, res, next) {
  User.findOne({ username: req.params.username, user_token: req.params.user_token })
  .exec(function (err, user) {
    if (!user) { return res.status(400).json({message:'Email not found'}); }
    if (user) {
      // user.generateUserToken();
      user.save(function (err){
        if(err){ next(err); }
        res.json({token: user.generateJWT()})
      });
    }
  });
};

exports.doResetPassword = function (req, res, next) {
  if (req.body.password !== req.body.repeat_password) {
    res.status(400).json({message: 'Passwords do not match'});
  }
  User.findOne({ username: req.params.username, user_token: req.params.user_token })
  .exec(function (err, user) {
    if (!user) { res.status(400).json({message:'Token expired'}); }
    if (user) { 
      user.resetUserPassword(req.body.password);
      user.generateUserToken();
      user.save(function (err){
        if (err) { return next(err); }
        res.json({token: user.generateJWT()})
      });
    }
  });
};
