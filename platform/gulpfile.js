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
   var js = ['public/backend/js/src/codemirror/codemirror.js', 'public/backend/js/src/codemirror/markdown.js', 'public/backend/js/src/marked/marked.min.js', 'public/backend/js/src/qiniu/plupload.min.js', 'public/backend/js/src/qiniu/qiniu.js', 'public/backend/js/src/tools.js', 'public/backend/js/src/do-manage.js', 'public/backend/js/src/uploader.js'];
   var js2 = ['public/backend/js/src/tools.js', 'public/backend/js/src/signin.js'];
   return gulp.src(js)
     .pipe(concat('all.js'))
     .pipe(rename({suffix: '.min'}))
     .pipe(uglify())
     .pipe(gulp.dest('public/backend/js/'));
});


/***
 * task minifycss
 */
gulp.task('minifycss', function() {
  var css = ['public/backend/css/src/do-manage.css', 'public/backend/css/src/font-awesome.min.css', 'public/backend/css/src/codemirror.css'];
  var css2 = ['public/backend/css/src/signin.css', 'public/backend/css/src/font-awesome.min.css'];
  return gulp.src(css)
    .pipe(concat('all.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/backend/css/'));
});

/***
 * task jshint
 */
gulp.task('jshint', function() {
  return gulp.src('public/backend/js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
