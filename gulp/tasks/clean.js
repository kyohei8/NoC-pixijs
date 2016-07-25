import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
