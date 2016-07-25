import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.development.babel';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const bundler = webpack(webpackConfig);

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const defaultStatsOptions = {
  colors: $.util.colors.supportsColor,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false, // reduce log
  children: true,
  version: true,
  cached: true,
  cachedAssets: true,
  reasons: true,
  source: true,
  errorDetails: true
};

gulp.task('serve', ['styles', 'fonts', 'pug'], () => {
  browserSync({
    notify         : false,
    port           : 9000,
    open           : false,
    reloadOnRestart: true,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    server         : {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/node_modules': 'node_modules'
      },
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          noInfo: false,
          quiet: false,
          stats: defaultStatsOptions
        }),
        webpackHotMiddleware(bundler)
      ]
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});
