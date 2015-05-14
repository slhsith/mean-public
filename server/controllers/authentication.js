
//Declarations
var 
	mongoose = require('mongoose'),
	nodemailer = require('nodemailer'),
  passport = require('passport'),
	User = mongoose.model('User'),
	transporter = nodemailer.createTransport({
    service: 'Mandrill',
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: 'trainersvault',
        pass: 'BGkIPqtGVLNL2JAGAmwHMw'
    }
  });


//Methods
exports.doRegistration = function(req, res, next) {
	console.log(req.body);
	if (!req.body.username || !req.body.password || !req.body.repeat_username || !req.body.repeat_password) {
		return res.status(400).json({message: 'Please fill out all fields'});
	} else if (req.body.username !== req.body.repeat_username) {
		return res.status(400).json({message: 'Emails do not match'});
	} else if (req.body.password !== req.body.repeat_password) {
		return res.status(400).json({message: 'Passwords do not match'});
	}

	// var checkEmail = function () {
	//   User.findOne({ username: req.body.username }, function (err, user) {
	//     if (user){ Console.log('email exists'); return true; }
	//     if (!user){ Console.log('email doesnt exists'); return false; }
	//   });
	// };
	// if (checkEmail()){
	// return res.status(400).json({message: 'Email is in use'});
	// }

	var user = new User();

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

		res.json({token: user.generateJWT()})
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
      res.status(401).json(info);
    }
  })(req, res, next);
};

exports.recoverPassword = function(req, res, next){
  if (!req.body.username) {
    return res.status(400).json({message: 'Please enter an email'});
  }

  var validEmail = function () {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (!user) { return res.status(400).json({message:'Email not found'}); return false; }
      if (user){
        var mailOptions = {
          from: 'contact@trainersvault.com', // sender address 
          to: user.username, // list of receivers 
          subject: 'Trainersvault Reset Password', // Subject line 
          generateTextFromHTML: true,
          text: '<div style="text-align=center">Please Click this link to reset your password!'
          + '<br/><br/>Link: http://localhost:3000/set/#/resetPassword/' + user.username + '/' + user.user_token 
          + '<br/><br/><br/>Thank you for using Trainersvault!',
        }; 
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          }
        });
      }
    })
  };

  validEmail();
};

exports.verifyEmail = function (req, res, next) {
  User.findOne({ username: req.params.username, user_token: req.params.user_token }, function (err, user) {
    if (!user) { return res.status(400).json({message:'Email not found'}); }
    user.validateUserEmailToken();
    user.generateUserToken();
    return res.json({'message': 'Successfully verified email address.'});
  });
};

exports.resetPassword = function (req, res, next) {
  User.findOne({ username: req.params.username, token: req.params.user_token }, function (err, user) {
      if (!user) { return res.status(400).json({message:'Email not found'}); return false; }
      if (user){
        res.json(user);
      }
  });
};

exports.doResetPassword = function (req, res, next) {
  // if(req.body.password !== req.body.repeat_password){
  //   return res.status(400).json({message: 'Passwords do not match'});
  // }
  var validate = function (password) {
    User.findOne({ username: req.params.username, user_token: req.params.user_token }, function (err, user) {
      if (!user) { return res.status(400).json({message:'Token expired'}); return false; }
      if (user){ user.resetUserPassword(password)
                 user.save(function (err){
                  if(err){ return next(err); }
                  return res.json({token: user.generateJWT()})
                 }) }
    })
  };
  validate();
};
