import gulp from 'gulp';
import rename from 'gulp-rename';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

import mode from 'gulp-mode';
const ENV_MODE = mode();

import sourcemaps from 'gulp-sourcemaps';

const babelTask = async () => {
  var bundleStream = browserify('./src/js/index.js')
    .transform(babelify)
    .bundle();

  bundleStream
    .pipe(source('./src/js/index.js'))
    .pipe(buffer())
    .pipe(ENV_MODE.development(sourcemaps.init({ loadMaps: true })))
    .pipe(streamify(uglify()))
    .pipe(ENV_MODE.production(rename('bundle.min.js')))
    .pipe(ENV_MODE.development(rename('bundle.js')))
    .pipe(ENV_MODE.development(sourcemaps.write('./')))
    .pipe(gulp.dest('dist/js'));
};
export default babelTask;
