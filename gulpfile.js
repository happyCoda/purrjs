let gulp = require('gulp'),
  less = require('gulp-less'),
  util = require('gulp-util'),
  rename = require('gulp-rename'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  watchify = require('watchify'),
  uglifyify = require('uglifyify'),
  buffer = require('vinyl-buffer'),
  source = require('vinyl-source-stream'),
  browsersync = require('browser-sync');

const PUBLIC_PATH = `${__dirname}/public`;
const BUILD_PATH = `${PUBLIC_PATH}/js/dest`;

gulp.task('css', () => {
  let src = `${PUBLIC_PATH}/css/src/style.less`,
    dest = `${PUBLIC_PATH}/css/dest/`,
    startBundle = Date.now();

  gulp.watch([src], () => {
    gulp.src(src)
      .pipe(less())
      .pipe(rename('purr.css'))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        let finishBundle = Date.now();
        util.log(`${util.colors.green('Css')} task finished in ${finishBundle - startBundle} ms`);
      });
  });
});

gulp.task('bundle', () => {
  b = browserify({
      basedir: PUBLIC_PATH,
      entries: 'js/src/app.js',
      cache: {},
      packageCache: {}
  })
  .plugin(watchify)
  .transform(babelify, {
      presets: ['es2015']
  })
  .transform(uglifyify, {
    global: true
  })
  .on('update', bundle);

  bundle();

  function bundle() {
    let startBundle = Date.now();

    util.log('Bundling js...');
    b.bundle()
    .on('error', (err) => {
      util.log(util.colors.red(err.message));
    })
    .on('end', () => {
      let finishBundle = Date.now();
      util.log(`Bundle finished in ${util.colors.green((finishBundle - startBundle) + ' ms')}`);
    })
    .pipe(source('app.js'))
    .pipe(rename('purr.min.js'))
    .pipe(gulp.dest(BUILD_PATH));
  }
});

gulp.task('browsersync', () => {
  let server = browsersync.create();

  server.init({
    port: 3000,
    server: {
      baseDir: PUBLIC_PATH,
      index: 'index.html'
    },
    open: false
  });

  gulp.watch([
      `${PUBLIC_PATH}/js/dest/*.js`,
      `${PUBLIC_PATH}/css/dest/*.css`,
      `${PUBLIC_PATH}/index.html`
    ]).on('change', server.reload);
});

gulp.task('dev', ['browsersync', 'bundle', 'css']);
