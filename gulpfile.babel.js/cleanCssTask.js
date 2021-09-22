import gulp from 'gulp';
import purgecss from 'gulp-purgecss';
import plumber from 'gulp-plumber';

const cleanCss = () => {
  return gulp
    .src('./dist/css/*.css')
    .pipe(plumber())
    .pipe(
      purgecss({
        content: ['./dist/*.html'],
      })
    )
    .pipe(gulp.dest('./dist/css'));
};

export default cleanCss;
