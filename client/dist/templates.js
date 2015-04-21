angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("400.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("401.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("403.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("404.html","<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>");
$templateCache.put("505.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("index.html","<!DOCTYPE html>\n<!--[if lt IE 7]>      <html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"> <![endif]-->\n<!--[if IE 7]>         <html class=\"no-js lt-ie9 lt-ie8\"> <![endif]-->\n<!--[if IE 8]>         <html class=\"no-js lt-ie9\"> <![endif]-->\n<!--[if gt IE 8]><!--> <html data-ng-app=\"mainApp\"> <!--<![endif]-->\n<head>\n\n    <!-- //// TITLE \\\\\\\\ -->\n    <title>Mean Starter // Application</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"description\" content=\"Mean Web Application\">\n    <meta name=\"author\" content=\"Leo Schultz\">\n    <meta name=\"keyword\" content=\"Mean, Starter\">\n\n    <!-- //// FAVICON \\\\\\\\ -->\n    <link rel=\"SHORTCUT ICON\" href=\"images/favicon.ico\" />\n\n    <!-- //// BOOTSTRAP \\\\\\\\ -->\n    <link rel=\"stylesheet\" href=\"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.2/css/bootstrap.min.css\" />\n    <link rel=\"stylesheet\" href=\"//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.css\" />\n    <!-- //// CSS \\\\\\\\ -->\n<!--\n    <link href=\'css/fonts.css\' rel=\"stylesheet\"/>\n    <link href=\"css/style.css\" rel=\"stylesheet\">\n-->\n\n    <link href=\'dist/all.min.css\' rel=\"stylesheet\"/>\n\n    <!-- //// IE \\\\\\\\ -->\n    <script>\n      var ie9 = false,\n          ie8 = false,\n          ie = false,\n          absurl = \'/\';\n    </script> \n    \n    <!--[if lte IE 9 ]>\n      <script> var ie9 = true; </script>\n    <![endif]--> \n\n    <!--[if lt IE 9 ]>\n      <script> var ie8 = true; </script>\n      <script src=\"https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js\"></script>\n      <script src=\"https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js\"></script>\n    <![endif]-->\n\n    <!--[if IE]>\n      <script> var ie = true; </script>\n    <![endif]-->\n    \n    <script src=\"//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js\"></script>\n</head>\n<body data-ng-controller=\"MainCtrl\">\n\n  <nav class=\"navbar navbar-default pull-right\" data-ng-controller=\"NavCtrl\">\n    <ul class=\"nav navbar-nav\">\n      <li data-ng-show=\"isLoggedIn()\"><a>{{ currentUser() }}</a></li>\n      <li data-ng-show=\"isLoggedIn()\"><a href=\"\" data-ng-click=\"logOut()\">Log Out</a></li>\n      <li data-ng-hide=\"isLoggedIn()\"><a href=\"/#/login\">Log In</a></li>\n      <li data-ng-hide=\"isLoggedIn()\"><a href=\"/#/register\">Register</a></li>\n    </ul>\n  </nav>\n\n\n  <div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n\n  <div class=\"page-header\">\n    <h1>Mean Starter</h1>\n  </div>\n\n  <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n    <span>{{ error.message }}</span>\n  </div>\n\n  <form data-ng-submit=\"register()\"\n    style=\"margin-top:30px;\">\n    <h3>Register</h3>\n\n    <div class=\"form-group\">\n      <input type=\"text\"\n      class=\"form-control\"\n      placeholder=\"Username\"\n      data-ng-model=\"user.username\"></input>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\"\n      class=\"form-control\"\n      placeholder=\"Password\"\n      data-ng-model=\"user.password\"></input>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n    <a href=\"/auth/facebook\">Login with Facebook</a>\n  </form>\n\n\n  <form data-ng-submit=\"logIn()\"\n    style=\"margin-top:30px;\">\n    <h3>Log In</h3>\n\n    <div class=\"form-group\">\n      <input type=\"text\"\n      class=\"form-control\"\n      placeholder=\"Username\"\n      data-ng-model=\"user.username\"></input>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\"\n      class=\"form-control\"\n      placeholder=\"Password\"\n      data-ng-model=\"user.password\"></input>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Log In</button>\n  </form>\n\n    </div>\n</div>\n\n  <script src=\"http://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js\"></script>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js\"></script>\n\n<!--\n  <script src=\"app.js\"></script>\n  <script src=\"/js/controllers.js\"></script>\n  <script src=\"/js/models.js\"></script>\n-->\n  <script src=\"dist/all.min.js\"></script>\n  <script src=\"dist/templates.js\"></script>\n</body>\n</html>");}]);