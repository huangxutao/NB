var gulp         = require('gulp'),
    watchPath    = require('gulp-watch-path'),
    autopreFixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename');

/***
 * task minifyjs
 */
 gulp.task('minifyjs', function() {
   var js = ['public/backend/js/codemirror.js', 'public/backend/js/markdown.js', 'public/backend/js/marked.min.js', 'public/backend/js/tools.js', 'public/backend/js/do-manage.js'];
   return gulp.src(js)
     .pipe(concat('all.js'))
     .pipe(rename({suffix: '.min'}))
     .pipe(uglify())
     .pipe(gulp.dest('public/backend/js/'));
});


