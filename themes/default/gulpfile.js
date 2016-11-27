var gulp         = require('gulp'),
    watchPath    = require('gulp-watch-path'),
    autopreFixer = require('gulp-autoprefixer'),
    cleanCSS     = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    jshint       = require('gulp-jshint');

/***
 * task minifyjs
 */
 gulp.task('minifyjs', function() {
   var js = ['source/js/src/highlight.min.js', 'source/js/src/script.js'];
   return gulp.src(js)
     .pipe(concat('script.js'))
     .pipe(rename({suffix: '.min'}))
     .pipe(uglify())
     .pipe(gulp.dest('source/js/'));
});


/***
 * task minifycss
 */
gulp.task('minifycss', function() {
  var css = ['source/css/src/atom-one-light.min.css', 'source/css/src/style.css'];
  return gulp.src(css)
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('source/css/'));
});

/***
 * task jshint
 */
gulp.task('jshint', function() {
  return gulp.src('source/js/src/script.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
