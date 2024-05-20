const path = require('path');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    detailsRestaurant: path.resolve(__dirname, 'src/scripts/detailsRestaurant/page.js'),
    favorite: path.resolve(__dirname, 'src/scripts/favorite/page.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'details-restaurant.html',
      template: path.resolve(__dirname, 'src/templates/details-restaurant.html'),
      chunks: ['detailsRestaurant'],
    }),
    new HtmlWebpackPlugin({
      filename: 'favorite.html',
      template: path.resolve(__dirname, 'src/templates/favorite.html'),
      chunks: ['favorite'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
        {
          from: path.resolve(__dirname, 'manifest.json'),
          to: path.resolve(__dirname, 'dist/manifest.json'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/service-worker.js'),
      swDest: 'service-worker.js',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
};
