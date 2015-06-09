angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html>\n<!--[if lt IE 7]>      <html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"> <![endif]-->\n<!--[if IE 7]>         <html class=\"no-js lt-ie9 lt-ie8\"> <![endif]-->\n<!--[if IE 8]>         <html class=\"no-js lt-ie9\"> <![endif]-->\n<!--[if gt IE 8]><!--> <html data-ng-app=\"mainApp\"> <!--<![endif]-->\n<head>\n\n    <!-- //// TITLE \\\\\\\\ -->\n    <title>Mean Starter // Application</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"description\" content=\"Mean Web Application\">\n    <meta name=\"author\" content=\"Leo Schultz\">\n    <meta name=\"keyword\" content=\"Mean, Starter\">\n\n    <!-- //// FAVICON \\\\\\\\ -->\n    <link rel=\"SHORTCUT ICON\" href=\"images/favicon.ico\" />\n\n    <!-- //// BOOTSTRAP \\\\\\\\ -->\n    <link rel=\"stylesheet\" href=\"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.2/css/bootstrap.min.css\" />\n    <link rel=\"stylesheet\" href=\"//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.css\" />\n    <!-- //// CSS \\\\\\\\ -->\n<!--\n    <link href=\'css/fonts.css\' rel=\"stylesheet\"/>\n    <link href=\"css/style.css\" rel=\"stylesheet\">\n-->\n\n    <link href=\'dist/all.min.css\' rel=\"stylesheet\"/>\n\n    <!-- //// IE \\\\\\\\ -->\n    <script>\n      var ie9 = false,\n          ie8 = false,\n          ie = false,\n          absurl = \'/\';\n    </script> \n    \n    <!--[if lte IE 9 ]>\n      <script> var ie9 = true; </script>\n    <![endif]--> \n\n    <!--[if lt IE 9 ]>\n      <script> var ie8 = true; </script>\n      <script src=\"https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js\"></script>\n      <script src=\"https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js\"></script>\n    <![endif]-->\n\n    <!--[if IE]>\n      <script> var ie = true; </script>\n    <![endif]-->\n    \n    <script src=\"//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js\"></script>\n    <!-- start Mixpanel --><script type=\"text/javascript\">(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(\".\");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;\"undefined\"!==typeof d?c=b[d]=[]:d=\"mixpanel\";c.people=c.people||[];c.toString=function(b){var a=\"mixpanel\";\"mixpanel\"!==d&&(a+=\".\"+d);b||(a+=\" (stub)\");return a};c.people.toString=function(){return c.toString(1)+\".people (stub)\"};i=\"disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user\".split(\" \");\nfor(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement(\"script\");a.type=\"text/javascript\";a.async=!0;a.src=\"undefined\"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\";e=f.getElementsByTagName(\"script\")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);\nmixpanel.init(\"08314cf925efc4376a17217e8922cd22\");</script><!-- end Mixpanel -->\n</head>\n<body data-ng-controller=\"MainCtrl\">\n\n  <nav class=\"navbar navbar-default pull-right\" data-ng-controller=\"NavCtrl\">\n    <ul class=\"nav navbar-nav\">\n      <li data-ng-show=\"isLoggedIn()\"><a>{{ currentUser() }}</a></li>\n      <li data-ng-show=\"isLoggedIn()\"><a href=\"\" data-ng-click=\"logOut()\">Log Out</a></li>\n    </ul>\n  </nav>\n\n\n  <div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n        <ui-view></ui-view>\n    </div>\n  </div>\n\n\n  <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js\"></script>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js\"></script>\n\n<!--\n  <script src=\"app.js\"></script>\n  <script src=\"/js/controllers.js\"></script>\n  <script src=\"/js/models.js\"></script>\n-->\n  <script src=\"dist/all.min.js\"></script>\n  <script src=\"dist/templates.js\"></script>\n</body>\n</html>");
$templateCache.put("400.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("401.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("403.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("404.html","<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>");
$templateCache.put("505.html","<header>\n            <nav class=\"navbar navbar-fixed-top affix-top\" role=\"navigation\" id=\"nav\" data-spy=\"affix\" data-offset-top=\"10\">\n                    <div class=\"container-fluid\">\n                        <!-- Brand and toggle get grouped for better mobile display -->\n                        <div class=\"navbar-header\">\n<!--                             <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">\n                                <span class=\"sr-only\">Toggle navigation</span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                                <span class=\"icon-bar\"></span>\n                            </button> -->\n\n                        <a href=\"/#/home\"><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:34%; padding-top:3%; padding-left:5%\"/></a>\n\n                        </div>\n\n                        <!-- Collect the nav links, forms, and other content for toggling -->\n                        <div class=\"collapse navbar-collapse navbar-right\" id=\"navbar-collapse\" style=\"padding-top:.5%\">\n                            <ul class=\"nav navbar-nav nav-list\">\n                                <li><a id=\"trigger-overlay-menu\" class=\"menu-overlay-ajax navoverlay signup-overlay-close\">Login</a></li>\n                                <li><a id=\"trigger-overlay-signup\" class=\"menu-overlay-ajax navoverlay menu-overlay-close\">Sign Up</a></li>\n                            </ul>\n                        </div><!-- /.navbar-collapse -->\n                </div><!-- /.container-fluid -->\n            </nav>\n        </header>\n<div id=\"menuOverlay\" class=\"menu-overlay overlay menu-overlay-slidedown\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"menu-overlay-close\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row\">\n          <div class=\"col-md-offset-2 col-md-3 text-center\">\n            <h4>Login with your email</h4>\n            <div data-ng-show=\"error\" class=\"alert alert-danger row\">\n              <span>{{ error.message }}</span>\n            </div>\n\n            <form data-ng-submit=\"logIn()\"\n              style=\"margin-top:30px; font-family:\'Ropa Sans\';padding-bottom: 5%;\">\n\n              <div class=\"form-group\">\n                <input type=\"text\"\n                class=\"form-control\"\n                placeholder=\"Username\"\n                data-ng-model=\"user.username\"></input>\n              </div>\n              <div class=\"form-group\">\n                <input type=\"password\"\n                class=\"form-control\"\n                placeholder=\"Password\"\n                data-ng-model=\"user.password\"></input>\n              </div>\n              <a type=\"submit\" class=\"btn btn-default btn-yellow\">Log In</a>\n            </form>\n          </div>\n          <div class=\"col-md-1\">\n          </div>\n          <div class=\"col-md-4 text-center border-sep\">\n            <h4>Login With Facebook</h4>\n            <div class=\"col-md-7 col-md-offset-2 social-btn-padding\" style=\"padding-left:7%\">\n              <a class=\"btn btn-block btn-social btn-facebook text-center\" style=\"font-family:\'Ropa Sans\';text-transform:uppercase;font-weight:bolder;font-size: 16px;\">\n                <i class=\"fa fa-facebook fa-2x\"></i>\n                Sign in with Facebook\n              </a>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n<div id=\"menuOverlay\" class=\"signup-overlay overlay menu-overlay-slidedown\" style=\"padding-bottom: 5%;\">\n        <div class=\"row menu-header menu-header-wrapper\">\n            <div class=\"col-xs-offset-1 col-xs-2\">\n            </div>\n            <div class=\"col-xs-6 menu-center\">\n            </div>\n            <div class=\"col-xs-3\">\n                <a class=\"signup-overlay-close signup-x\">\n                    <img src=\"images/xsepWhite.png\" alt=\"close image\"  data-toggle=\"tooltip\" title=\"Close\">\n                </a>\n            </div>\n        </div>\n    <div class=\"menuContent\">\n        <div class=\"row text-center\">\n          <h4>Sign Up</h4>\n          <div class=\"col-md-offset-2 col-md-4 text-center\">\n            <h4>as a user</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a User</a>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <h4>as a trainer</h4>\n            <p style=\"font-family:\'Ropa Sans\';\">Test Content</p>\n            <a href=\"/#/register\" class=\"btn btn-default btn-yellow\">Sign Up As a Trainer</a>\n          </div>\n        </div>  \n    </div>\n</div>\n<section id=\"errorPage\">\n	<div class=\"errorMessage\">\n		<h4>We\'re sorry. Please return to where you were <a>here</a>.</h4>\n	</div>\n</section>\n<section id=\"footer\">\n    <div class=\"col-md-12 footer text-center\">\n            <ul class=\"footerSocialIcons\">\n                <li><a class=\"facebook-icon\" target=\"_blank\" href=\"https://www.facebook.com/trainersvault\"><i class=\"fa fa-facebook fa-2x\"></i></a></li>\n                <li><a class=\"twitter-icon\" target=\"_blank\" href=\"https://twitter.com/trainersvault\"><i class=\"fa fa-twitter fa-2x\"></i></a></li>\n                <li><a class=\"linkedin-icon\" target=\"_blank\" href=\"https://www.linkedin.com/company/trainersvault\"><i class=\" fa fa-linkedin fa-2x\"></i></a></li>\n                <li><a class=\"googleplus-icon\" target=\"_blank\" href=\"https://plus.google.com/114783021392849211709/posts/gYp4ocU2ZdP\"><i class=\"fa fa-google-plus fa-2x\"></i></a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">ABOUT</a></li>\n                <li class=\"footer\"><a href=\"http://help.trainersvault.com/hc/en-us\" target=\"_blank\" class=\"hover hoveryellow white\">HELP</a></li>\n                <li class=\"footer\"><a href=\"http://blog.trainersvault.com/\" target=\"_blank\" class=\"hover hoveryellow white\">BLOG</a></li>\n                <li class=\"footer\"><a class=\"hover hoveryellow white\">TERMS</a></li>\n            </ul>\n            <ul class=\"footerSocialIcons\">\n                <li class=\"footercopy\">COPYRIGHT &copy; 2015 TrainersVault, Inc. ALL RIGHTS RESERVED.</li><br>\n                <li><img class=\"responsive\" src=\"images/logo.png\" style=\"max-width:10%;\"></li>\n            </ul>\n    </div>\n</section>");
$templateCache.put("home.html","    <div ng-show=\"isAdmin()\">\n      <div class=\"page-header\">\n        <h1>Mean Starter</h1>\n      </div>\n      <h3>Users</h3>\n      <div ng-repeat=\"user in users\">\n        <span>{{user.l_name}},</span>\n        <span>{{user.f_name}}</span> |\n        <span>{{user.handle}}</span> | \n        <a href=\"#/user/{{user._id}}\">See More</a>\n      </div>\n      <div class=\"text-center\">\n        <btn class=\"btn btn-primary\">Daily</btn><btn class=\"btn btn-primary\">Monthly</btn><btn class=\"btn btn-primary\">Quarterly</btn><btn class=\"btn btn-primary\">Annually</btn>\n      </div>\n      <div>\n        <h3>Gross Revenue</h3>\n        <span>$100,000</span>\n      </div>\n      <div>\n        <h3>Gross Expenses</h3>\n        <span>$1,000</span>\n      </div>\n      <div>\n        <h3>Gross Profit</h3>\n        <span>$99,000</span>\n      </div>\n      <div>\n        <h3>Gross Payouts</h3>\n        <span>$80,000</span>\n      </div>\n      <div>\n        <h3>Net Profit</h3>\n        <span>$19,000</span>\n      </div>\n      <div>\n        <h3>Total Users</h3>\n        <span>50,000</span>\n      </div>\n      <div>\n        <h3>Total Unit Sales</h3>\n        <span>19,000</span>\n      </div>\n      <div>\n        <h3>Total Site Traffic</h3>\n        <span>19,000 page views, 100,000 sign ups/logins, 10,000 purchase conversations</span>\n      </div>\n      <div>\n        <h3>Top Search Terms</h3>\n        <span>Hello</span><br>\n        <span>Noelleb</span><br>\n        <span>Thessler</span>\n      </div>\n      <div>\n        <h3>Top Sales Locations</h3>\n        <span>LA</span><br>\n        <span>Buffalo</span><br>\n        <span>NYC</span>\n      </div>\n    </div>\n    <div ng-if=\"isLoggedIn()\" ng-hide=\"isAdmin()\">\n      <h3>You need to be an admin to access this page. <a href=\"/user/#/home\">Return Home</a></h3>\n    </div>\n    <div ng-if=\"!isLoggedIn()\">\n      <h3>You need to be logged in to access this page. Log In or Sign Up<a href=\"/#/\"> here</a>.</h3>\n    </div>");
$templateCache.put("orders.html","<div class=\"page-header\">\n	<h1>Orders</h1>\n</div>\n<div>\n	<h3>Item</h3>\n	<span>{{item.name}}</span>\n</div>\n<div>\n	<h3>User</h3>\n	<span>{{user.name}}</span>\n</div>\n<div>\n	<h3>Owner</h3>\n	<span>{{owner.name}}</span>\n</div>\n<div>\n	<h3>State</h3>\n	<span>{{state.name}}</span>\n</div>\n<div>\n	<h3>Total</h3>\n	<span>{{total}}</span>\n</div>\n<div>\n	<h3>Date/Time</h3>\n	<span>{{date}}</span>\n</div>\n<div>\n	<input class=\"text\" placeholder=\"Search Orders\"/>\n</div>");
$templateCache.put("posts.html","<div class=\"page-header\">\n    <h3>\n      <a data-ng-show=\"post.link\" href=\"{{post.link}}\">\n        {{post.title}}\n      </a>\n      <span data-ng-hide=\"post.link\">\n        {{post.title}}\n      </span>\n    </h3>\n  </div>\n\n  <div data-ng-repeat=\"comment in post.comments | orderBy:\'-upvotes\'\">\n    <span class=\"glyphicon glyphicon-thumbs-up\"\n      data-ng-click=\"incrementUpvotes(comment)\"></span>\n    {{comment.upvotes}} - by {{comment.author}}\n    <span style=\"font-size:20px; margin-left:10px;\">\n      {{comment.body}}\n    </span>\n  </div>\n  <form data-ng-submit=\"addComment()\"\n    style=\"margin-top:30px;\">\n    <h3>Add a new comment</h3>\n\n    <div class=\"form-group\">\n      <input type=\"text\"\n      class=\"form-control\"\n      placeholder=\"Comment\"\n      data-ng-model=\"body\"></input>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Post</button>\n  </form>");
$templateCache.put("users.html","<div data-ng-show=\"isAdmin()\">\n<div style=\"padding-bottom:20px;\">\n<a href=\"/set/#/user/{{user.handle}}\"><button class=\"btn btn-primary\" style=\"width:100%;\">View Profile</button></a>\n</div>\n<div data-ng-show=\"!view\">\n<button class=\"btn btn-primary\" data-ng-click=\"view = !view\" style=\"width:100%;\">Edit</button>\n	<h3>Details for {{user.f_name}} {{user.l_name}}</h3>\n	<table class=\"table\">\n	  <tr>\n	  	<td>ID</td>\n	  	<td>{{user._id}}</td>\n	  </tr>\n	  <tr>\n	    <td>First Name</td>\n	    <td>{{user.f_name}}</td> \n	  </tr>\n	  <tr>\n	    <td>Last Name</td> \n	    <td>{{user.l_name}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Address</td> \n	    <td>{{user.address}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Date of Birth</td> \n	    <td>{{user.dob}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Handle</td> \n	    <td>{{user.handle}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Email</td>\n	  	<td>{{user.username}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Created On</td> \n	    <td>{{user.created}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Permissions</td> \n	    <td>{{user.permissions}}</td>\n	  </tr>\n	  <tr>\n	  	<td>Followers</td>\n	  	<td>{{user.followers}}</td>\n	  </tr>\n	</table>\n</div>\n<div data-ng-show=\"view\">\n<form data-ng-submit=\"update()\">\n<button class=\"btn btn-primary\" data-ng-click=\"view = !view\" style=\"width:100%;\">View</button>\n	<h3>Editing {{user.f_name}} {{user.l_name}}</h3>\n	<table class=\"table\">\n	  <tr>\n	  	<td>ID</td>\n	  	<td>{{user._id}}</td>\n	  </tr>\n	  <tr>\n	    <td>First Name</td>\n	    <td><input data-ng-model=\"user.f_name\" style=\"width:100%;\"></td> \n	  </tr>\n	  <tr>\n	    <td>Last Name</td> \n	    <td><input data-ng-model=\"user.l_name\" style=\"width:100%;\"></td>\n	  </tr>\n	  <tr>\n	  	<td>Address</td> \n	    <td><input data-ng-model=\"user.address\" style=\"width:100%;\"></td>\n	  </tr>\n	  <tr>\n	  	<td>Date of Birth</td> \n	    <td><input  data-ng-model=\"user.dob\" style=\"width:100%;\"></td>\n	  </tr>\n	  <tr>\n	  	<td>Handle</td> \n	    <td><input data-ng-model=\"user.handle\" style=\"width:100%;\"></td>\n	  </tr>\n	  <tr>\n	  	<td>Email</td> \n	    <td><input data-ng-model=\"user.username\" style=\"width:100%;\"></td>\n	  </tr>\n	  <tr>\n	  	<td>Permissions</td> \n	    <td><input data-ng-model=\"user.permissions\" style=\"width:100%;\"></td>\n	  </tr>\n	  <tr>\n	  	<td>Followers</td> \n	    <td>{{user.followers}}</td>\n	  </tr>\n	</table>\n	<button type=\"submit\" class=\"btn btn-primary\" data-ng-click=\"view = !view\">Update</button>\n</form>\n</div>\n</div>\n<div data-ng-if=\"isLoggedIn()\" data-ng-hide=\"isAdmin()\">\n  <h3>You need to be an admin to access this page. <a href=\"/user/#/home\">Return Home</a></h3>\n</div>\n<div data-ng-if=\"!isLoggedIn()\">\n  <h3>You need to be logged in to access this page. Log In or Sign Up<a href=\"/#/\"> here</a>.</h3>\n</div>");}]);