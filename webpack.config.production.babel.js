import baseConfig from './webpack.config.base';
import webpack from 'webpack';
import glob from 'glob'

const _entry = {};
glob.sync('./app/scripts/*.js').forEach((file) => {
  const matcher = file.match(/scripts\/(.+)\.js/);
  const filename = matcher[1];
  _entry[filename] = [
    'babel-polyfill',
    file
  ];
});

const config = Object.create(baseConfig);
config.entry = _entry;

config.plugins = [
  new webpack.ProvidePlugin({ riot: 'riot' }),
  new webpack.optimize.DedupePlugin(), // 重複したファイルを除去
  new webpack.optimize.OccurenceOrderPlugin(), // コンパイルするファイルの順番を調整
  /*
  new webpack.optimize.UglifyJsPlugin({ // Uglify
    mangle: true, // ローカル変数名を短い名称に変更する
    sourcemap: false,
    compress: {
      unused: false,
      conditionals: false,
      dead_code: false,
      side_effects: false
    }
  }),
  */
  new webpack.ProgressPlugin((percentage, msg) => {
    process.stdout.write('progress ' + Math.floor(percentage * 100) + '% ' + msg + '\r');
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
];

export default config;
