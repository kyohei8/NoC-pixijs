// postcss
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import short from 'postcss-short';
import _import from 'postcss-easy-import';
import stylelint from 'stylelint';
import assets from 'postcss-assets';
import reporter from 'postcss-reporter';
import browserSync from 'browser-sync';
import doiuse from 'doiuse';
import sprites, { updateRule } from 'postcss-sprites';
import path from 'path';

const $ = gulpLoadPlugins();
const reload = browserSync.stream;

const browsers = [
  'ie >= 11',
  'ff >= 44',
  'chrome >= 48',
  'safari >= 8',
  'ios >= 7',
  'android >= 4.4',
  'ChromeAndroid >= 45'
];

const processors = [
  _import({
    path: ['node_modules'],
    glob: true
  }),
  short,
  cssnext({browsers}),
  assets({
    basePath: 'app/',
    loadPaths: ['assets/images/'],
    relativeTo: 'app'
  }),
  sprites({
    stylesheetPath: 'app/styles/', //出力するcssのパス
    spritePath: 'app/assets/images',   //スプライト画像を出力する先のパス
    basePath: 'app/',  // urlのベースパス
    relativeTo: 'app',
    retina: true,
    // images/spritesのみスプライトの対象とする
    filterBy(image){
      if(/images\/sprites/.test(image.url)){
        return Promise.resolve();
      }
      return Promise.reject();
    },
    groupBy: function(image) {
      if (image.url.indexOf('@2x') === -1) {
        return Promise.resolve('@1x');
      }
      return Promise.resolve('@2x');
    },
    spritesmith: {
      padding: 10
    },
    hooks: {
      // 出力されるスプライト画像ファイル名を変更する sprite@2xだと同じファイルが量産されるので
      onSaveSpritesheet: function(opts, groups) {
        if(groups[0] === '@1x'){
          // 通常サイズのスプライト
          return path.join(opts.spritePath, '_sprites.png');
        }else{
          // retinaサイズのスプライト
          return path.join(opts.spritePath, '_sprites@2x.png');
        }
      }
    }
  }),
  reporter({ clearMessages: true })
];

gulp.task('stylelint', () => {
  return gulp.src('app/styles/**/*.css')
    .pipe($.plumber())
    .pipe(postcss([
      stylelint,
      doiuse({
        browsers,
        ignore: ['flexbox'],
        ignoreFiles: ['**/node_modules/**/*.css', '**/_sprite.css']
      }),
      reporter({ clearMessages: true })
    ]))
});

gulp.task('styles', ['stylelint'], () => {
  return gulp.src('app/styles/**/main.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(postcss(processors))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({match: "**/*.css"}));
});

gulp.task('styles:prod', ['stylelint'], () => {
  return gulp.src('app/styles/**/main.css')
    .pipe($.plumber())
    .pipe(postcss(processors))
    .pipe(gulp.dest('.tmp/styles'))
});
