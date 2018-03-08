const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackConfig => {
  return {
    entry: path.resolve('./src') + '/app.js',
    output: {
      filename: 'app.bundle.js',
      path: path.resolve('./dist')
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /.js$/,
          include: path.resolve('./src'),
          loader: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'popup.html',
        template: './src/popup.html',
        hash: true
      }),
      new ExtractTextPlugin('styles.css'),
      new CopyWebpackPlugin([
        { from: './assets/icon*', to: '', flatten: true },
        { from: './assets/manifest*', to: '', flatten: true }
      ])
    ]
  };
};
