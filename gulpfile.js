// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

var rename = require('gulp-rename');

// Minification
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");


// angular stuff
var ngAnnotate = require("gulp-ng-annotate");
var htmlify = require('gulp-angular-htmlify');
var templateCache = require('gulp-angular-templatecache');

// sever stuff
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;


// Lint Task
gulp.task('lint', function() {
    return gulp.src(['client/app.js','client/js/controllers.js','client/js/models.js', 
        'client/user/app.js','client/user/js/controllers.js','client/user/js/models.js',
        'client/admin/app.js','client/admin/js/controllers.js','client/admin/js/models.js',
        'client/set/app.js','client/set/js/controllers.js','client/set/js/models.js',
        'client/user/pages/messenger/*.js', 'client/user/pages/shop/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['client/app.js','client/js/controllers.js','client/js/models.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('client/dist'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('client/dist'));
});

gulp.task('userscripts', function() {
    return gulp.src(['client/user/app.js','client/user/js/controllers.js','client/user/js/models.js', 'client/user/pages/*/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('client/user/dist'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('client/user/dist'));
});

gulp.task('adminscripts', function() {
    return gulp.src(['client/admin/app.js','client/admin/js/controllers.js','client/admin/js/models.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('client/admin/dist'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('client/admin/dist'));
});

gulp.task('setscripts', function() {
    return gulp.src(['client/set/app.js','client/set/js/controllers.js','client/set/js/models.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('client/set/dist'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('client/set/dist'));
});

// Minify CSS
gulp.task('styles', function () {
    gulp.src('client/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('client/dist'))
        .pipe(minifyCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('client/dist'));
});

gulp.task('userstyles', function () {
    gulp.src(['client/user/css/*.css','client/user/pages/*/*.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('client/user/dist'))
        .pipe(minifyCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('client/user/dist'));
});

gulp.task('adminstyles', function () {
    gulp.src('client/admin/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('client/admin/dist'))
        .pipe(minifyCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('client/admin/dist'));
});

gulp.task('setstyles', function () {
    gulp.src('client/set/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('client/set/dist'))
        .pipe(minifyCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('client/set/dist'));
});

// Minify, Cache and Compile Markup
gulp.task('markup', function () {
    gulp.src(['client/*.html','client/views/*.html'])
        .pipe(htmlify())
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest("client/dist"))
});

gulp.task('usermarkup', function () {
    gulp.src(['client/user/*.html','client/user/views/*.html'])
        .pipe(htmlify())
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest("client/user/dist"))
});

gulp.task('adminmarkup', function () {
    gulp.src(['client/admin/*.html','client/admin/views/*.html'])
        .pipe(htmlify())
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest("client/admin/dist"))
});

gulp.task('setmarkup', function () {
    gulp.src(['client/set/*.html','client/set/views/*.html'])
        .pipe(htmlify())
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest("client/set/dist"))
});

// run karma unit testing
gulp.task('test', function(done) {
    karma.start({
        configFile: 'test/karma.conf.js'
    }, done);
});

// Watch Files For Changes
gulp.task('watch', function() {

    // javascript
    gulp.watch('client/js/*.js', ['lint', 'scripts']);
    gulp.watch('client/user/js/*.js', ['lint', 'userscripts']);
    gulp.watch('client/user/pages/*/*.js', ['lint', 'userscripts']);
    gulp.watch('client/admin/js/*.js', ['lint', 'adminscripts']);
    gulp.watch('client/set/js/*.js', ['lint', 'setscripts']);

    // markup
    gulp.watch('client/*.html', ['markup']);
    gulp.watch('client/user/*.html', ['usermarkup']);
    gulp.watch('client/user/views/*.html', ['usermarkup']);
    gulp.watch('client/user/pages/*/*.html', ['usermarkup']);
    gulp.watch('client/admin/*.html', ['adminmarkup']);
    gulp.watch('client/admin/views/*.html', ['adminmarkup']);
    gulp.watch('client/set/*.html', ['setmarkup']);
    gulp.watch('client/set/views/*.html', ['setmarkup']);

    // stylesheets
    gulp.watch('client/css/*.css', ['styles']);
    gulp.watch('client/user/css/*.css', ['userstyles']);
    gulp.watch('client/user/pages/*/*.css', ['userstyles']);
    gulp.watch('client/admin/css/*.css', ['adminstyles']);
    gulp.watch('client/set/css/*.css', ['setstyles']);
});

gulp.task('server', function (cb) {
  exec('npm install', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  // exec('mongod', function (err, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  //   cb(err);
  // });
  // exec('npm start', function (err, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  //   cb(err);
  // });
});
gulp.task('start', function () {
  nodemon({
    ext: 'js html'
  })
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'userscripts', 'adminscripts', 'setscripts', 'styles', 'userstyles', 'adminstyles', 'setstyles', 'markup', 'usermarkup', 'adminmarkup', 'setmarkup', 'server', 'start', 'watch']);





