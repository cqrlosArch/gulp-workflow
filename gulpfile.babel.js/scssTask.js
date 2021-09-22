import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { stream } from 'browser-sync';
import mode from 'gulp-mode';
import rename from 'gulp-rename';

const ENV_MODE = mode();


const plugins = [autoprefixer(), cssnano()];

const scssTask = async () => {
  return gulp
    .src('src/scss/*.scss')
    .pipe(
      sass({ outputStyle: ENV_MODE.production() ? 'compressed' : 'expanded' })
    )
    .on('error', sass.logError)
    .pipe(ENV_MODE.production(postcss(plugins)))
    .pipe(ENV_MODE.production(rename('styles.min.css')))
    .pipe(gulp.dest('dist/css'))
    .pipe(stream());
};
export default scssTask;
