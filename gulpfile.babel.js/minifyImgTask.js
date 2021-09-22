import gulp from 'gulp';

import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import mode from 'gulp-mode';

const ENV_MODE = mode();

const imagenMin = async () => {
  return gulp
    .src('./src/assets/**/*', { since: gulp.lastRun(imagenMin) })
    .pipe(plumber())
    .pipe(
      ENV_MODE.production(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(gulp.dest('./dist/assets'));
};

export default imagenMin;
