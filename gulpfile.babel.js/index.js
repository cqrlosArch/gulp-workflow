import { series, parallel, watch } from 'gulp';
import { init as server, reload } from 'browser-sync';

import babelTask from './babelTask.js';
import cleanOutput from './cleanOutput.js';
import scssTask from './scssTask.js';
import viewsTask from './viewsTask.js';
import cleanCss from './cleanCssTask.js';
import imagenMin from './minifyImgTask.js';

const init = () => {
  server({
    server: './dist',
  });
  watch('./src/views/**/*.pug', viewsTask).on('change', reload);
  watch('./src/js/**/*.js', babelTask).on('change', reload);
  watch('./src/scss/**/*.scss', scssTask);
  watch('./src/assets/images/**/*.(svg|jpg|ico|png|jpeg)', imagenMin).on(
    'change',
    reload
  );
};

export const build = series(
  cleanOutput,
  parallel(babelTask, scssTask, viewsTask, imagenMin),
  cleanCss
);

exports.default = series(build, init);
