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
// nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;


// Lint Task
gulp.task('lint', function() {
    return gulp.src(['client/app.js','client/js/controllers.js','client/js/models.js','client/user/app.js','client/user/js/controllers.js','client/user/js/models.js','client/admin/app.js','client/admin/js/controllers.js','client/admin/js/models.js'])
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
    return gulp.src(['client/user/app.js','client/user/js/controllers.js','client/user/js/models.js'])
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
    gulp.src('client/user/css/*.css')
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

// Watch Files For Changes
gulp.task('watch', function() {

    // javascript
    gulp.watch('client/js/*.js', ['lint', 'scripts']);
    gulp.watch('client/user/js/*.js', ['lint', 'userscripts']);
    gulp.watch('client/admin/js/*.js', ['lint', 'adminscripts']);

    // markup
    gulp.watch('client/*.html', ['markup']);
    gulp.watch('client/user/*.html', ['usermarkup']);
    gulp.watch('client/user/views/*.html', ['usermarkup']);
    gulp.watch('client/admin/*.html', ['adminmarkup']);
    gulp.watch('client/admin/views/*.html', ['adminmarkup']);

    // stylesheets
    gulp.watch('client/css/*.css', ['styles']);
    gulp.watch('client/user/css/*.css', ['userstyles']);
    gulp.watch('client/admin/css/*.css', ['adminstyles']);
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
  exec('npm start', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'userscripts', 'adminscripts', 'styles', 'userstyles', 'adminstyles', 'markup', 'usermarkup', 'adminmarkup', 'server', 'watch']);





