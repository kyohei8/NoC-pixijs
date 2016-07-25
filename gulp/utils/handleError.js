import notify from 'gulp-notify';

export default function(...args){
  // 通知
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);
  this.emit && this.emit('end');
};
