var mailer   = require("mailer")
  , username = "trainersvault"
  , password = "BGkIPqtGVLNL2JAGAmwHMw";

mailer.send(
  { host:           "smtp.mandrillapp.com"
  , port:           587
  , to:             "thomas@trainersvault.com"
  , from:           "contact@trainersvault.com"
  , subject:        "Mandrill knows Javascript!"
  , body:           "Hello from NodeJS!"
  , authentication: "login"
  , username:       "trainersvault"
  , password:       "BGkIPqtGVLNL2JAGAmwHMw"
  }, function(err, result){
    if(err){
      console.log(err);
    }
  }
);