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
    return gulp.src(['public/app.js','public/js/controllers.js','public/js/models.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['public/app.js','public/js/controllers.js','public/js/models.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/dist'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});

// Minify CSS
gulp.task('styles', function () {
    gulp.src('public/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/dist'))
        .pipe(minifyCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('public/dist'));
});

// Minify, Cache and Compile Markup
gulp.task('markup', function () {
    gulp.src(['public/*.html','public/views/*.html'])
        .pipe(htmlify())
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest("public/dist"))
});

// Watch Files For Changes
gulp.task('watch', function() {

    // javascript
    gulp.watch('public/js/*.js', ['lint', 'scripts']);
    gulp.watch('public/views/*.js', ['lint', 'scripts']);

    // markup
    gulp.watch('public/*.html', ['markup']);
    gulp.watch('public/views/*.html', ['markup']);

    // stylesheets
    gulp.watch('public/css/*.css', ['styles']);
});

gulp.task('server', function (cb) {
  exec('npm start', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'styles', 'markup', 'server', 'watch']);