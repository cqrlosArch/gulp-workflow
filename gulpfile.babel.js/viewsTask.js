import gulp from 'gulp';
import cacheBust from 'gulp-cache-bust';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import mode from 'gulp-mode';
import htmlreplace from 'gulp-html-replace';
const ENV_MODE = mode();

const viewsTask = () => {
  return gulp
    .src('./src/views/pages/*.pug')
    .pipe(plumber())
    .pipe(
      pug({
        pretty: ENV_MODE.production() ? false : true,
      })
    )
    .pipe(
      cacheBust({
        type: 'timestamp',
      })
    )
    .pipe(
      ENV_MODE.production(
        htmlreplace({
          js: {
            src: ['js/bundle.min.js'],
            tpl: '<script src="%s" defer></script>',
          },
          css: {
            src: [
              ['css/styles.min.css', 'js/bundle.min.js', 'css/styles.min.css'],
            ],
            tpl: '<link rel="preload" href="%s" as="style"/><link rel="modulepreload" href="%s"/><link rel="stylesheet" href="%s"/>',
          },
        })
      )
    )
    .pipe(gulp.dest('./dist'));
};

export default viewsTask;
