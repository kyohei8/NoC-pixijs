import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const minifyHtmlOpt = {
  conditionals: true, // IE条件コメントを消さない
  loose       : true, // 空白文字を削除しない
  quotes      : true  //クオートを削除しない
};

/**
 * pugタスク
 */
gulp.task('pug', () => {
  gulp.src('app/**/!(_)*.pug')
    .pipe($.debug({title: 'pug Compiled:'}))
    .pipe($.pug({
      pretty: true, //htmlをminifyしない
      cache : true
    }))
    .pipe(gulp.dest('.tmp/'))
    .pipe(reload({stream: true}));
});

// ※ gulp js, pugを先に実行しておくこと
gulp.task('html', () => {
  const assets = $.useref({
    searchPath: ['{app, !app/scripts', '.']
  });
  const jsCssAssets = $.useref({
    searchPath: ['.tmp']
  });

  return gulp.src('.tmp/*.html')
    .pipe($.debug())
    .pipe(jsCssAssets)
    .pipe($.if('*.css', $.minifyCss({
      processImport: false,
      compatibility: '*'
    })))
    .pipe(assets)
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml(minifyHtmlOpt)))
    .pipe(gulp.dest('dist'));
});
