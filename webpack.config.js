const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: './build',
    filename: '[hash:6].app.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: '💩',
      template: './src/index.html',
      inject: 'body'
    })
  ],
  devtool: '#source-map'
};
