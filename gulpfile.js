const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


function styles() {
    return gulp.src('./sass/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./'));
  };
  
  exports.styles = styles;

 
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});