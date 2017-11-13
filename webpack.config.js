let path = require('path');
let webpack = require('webpack');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let isDev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, './dest'),
    filename: 'purr.min.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  ...(isDev ? {
    plugins: [
      new BrowserSyncPlugin({
        port: 9000,
        server: {
          baseDir: ['./']
        },
        open: false,
        notify: false
      })
    ]
  } : {
    plugins: [new webpack.optimize.UglifyJsPlugin()]
  }),
  watch: isDev,
  ...(isDev ? { watchOptions: { poll: 1000, ignored: /node_modules/ } } : {})
};
