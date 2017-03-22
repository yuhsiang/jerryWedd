var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var plugins = [
  new CleanPlugin('client/build'),
  new ExtractPlugin('[name].css', { allChunks: true }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'client/app/index.html'),
    filename: 'index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.PROD) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false,
        dead_code: true,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    })
  );
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client/app/index.js'),
    vendor: [
      'react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk',
      'superagent', 'material-ui'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: '[name].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.(jpg|git|png)$/,
        loader: 'url?limit=8192&name=images/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=8192&name=images/[name].[ext]'
      },
      {
        test:  /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=8192&minetype=application/font-woff2&name=images/[name].[ext]'
      },
      // Used for Bootstrap Less Source Files
      { test: /\.less/, loader: 'style!css!less' },
      // Used for Bootstrap Less Source Files
      { test: /\.css/, loader: 'style!css' },
      // Used for Bootstrap Glyphicon Fonts
      { test: /\.(woff2|woff|ttf|svg|eot)$/, loader: 'file' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  devServer: {
    contentBase: 'build',
    host: '0.0.0.0',
    port: 8090
  },
};
