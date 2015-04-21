// Karma configuration
module.exports = function(config){
    config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
    basePath : '../',

    // testing framework, be sure to install the karma plugin
    frameworks: ['jasmine'],

    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js',
 
      // include js files
      'client/dist/*.js',
      'client/user/dist/*.js',
      'client/admin/dist/*.js',
 
      // include unit test specs
      'test/unit/*.js'
    ],
    // files to exclude
    exclude : [
      'gulpfile.js'
    ],
 
    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,
 
    // progress is the default reporter
    reporters: ['progress'],

    // web server port
    port: 3000,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
 
    // browsers to test against, be sure to install the correct karma browser launcher plugin
    browsers : ['Chrome', 'PhantomJS'],
 

 
    // map of preprocessors that is used mostly for plugins
    preprocessors: {
 
    },
 
    // list of karma plugins
    plugins : [
        'karma-junit-reporter',
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ]
})}