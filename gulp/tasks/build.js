import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

// 静的ファイルを移動
gulp.task('extras', () => {
  gulp.src([
    'app/*.*',
    '!app/*.pug'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));

  gulp.src([
    'app/assets/**/*',
    '!app/assets/images/',
    '!app/assets/fonts/'
  ], {
    dot: false
  }).pipe(gulp.dest('dist/assets'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*')
    .pipe($.size({title: 'build', gzip: true}));
});
