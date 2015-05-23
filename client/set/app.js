/*  ----------------  *
    APP MODULE - SET
 *  ----------------  */
var app = angular.module('mainApp', ['ui.router','templates', 'uiGmapgoogle-maps']);

app.config([
'$stateProvider',
'$urlRouterProvider','uiGmapGoogleMapApiProvider',
function($stateProvider, $urlRouterProvider, GoogleMapApi) {
  $stateProvider
    .state('emailVerify', {
      url: '/emailverify/:username/:user_token',
      templateUrl: 'emailVerify.html',
      resolve: {
        verifyPromise: function($stateParams, verification) {
          return verification.emailVerify($stateParams.username, $stateParams.user_token);
        }
      },
      controller: 'MainCtrl'
    })
    .state('resetPassword', {
      url: '/resetpassword/:username/:user_token',
      templateUrl: 'resetPassword.html',
      resolve: {
        resetPromise: function($stateParams, verification) {
          return verification.getUser($stateParams.username, $stateParams.user_token);
        }
      },
      controller: 'ResetCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'search.html',
      controller: 'SearchCtrl',
      resolve: {
        searchPromise: function($stateParams, search) {
          return search.get($stateParams.query);
        }
      }
    })
    .state('searchResults', {
      url: '/search/:query',
      templateUrl: 'search.html',
      controller: 'SearchCtrl',
      resolve: {
        searchPromise: function($stateParams, search) {
          return search.get($stateParams.query);
        }
      }
    })
    .state('mapResults', {
      url: '/mapResults',
      templateUrl: 'map.html',
      controller: 'MapCtrl'
    })
    .state('userProfile', {
      url: '/user/:handle',
      templateUrl: 'userProfile.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: function($stateParams, users) {
          return users.get($stateParams.handle);
        }
      }
    });
  // $urlRouterProvider.otherwise('home');
// GoogleMapApi.configure({
//     // key: 'your api key',
//     v: '3.17',
//     libraries: 'places'
//   });
}]);