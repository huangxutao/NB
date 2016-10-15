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
   var js = ['public/backend/js/src/codemirror/codemirror.js', 'public/backend/js/src/codemirror/markdown.js', 'public/backend/js/src/marked/marked.min.js', 'public/backend/js/src/qiniu/plupload.min.js', 'public/backend/js/src/qiniu/qiniu.js', 'public/backend/js/src/tools.js', 'public/backend/js/src/do-manage.js', 'public/backend/js/src/uploader.js'];
   var js2 = ['public/backend/js/src/tools.js', 'public/backend/js/src/signin.js']
   return gulp.src(js)
     .pipe(concat('all.js'))
     .pipe(rename({suffix: '.min'}))
     .pipe(uglify())
     .pipe(gulp.dest('public/backend/js/'));
});


