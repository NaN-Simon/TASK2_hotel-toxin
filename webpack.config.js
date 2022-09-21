const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(`${mode} mode`);

module.exports = {
  mode,
  entry: {
    scripts: './src/index.js',
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  resolve: {
    alias: {
      '@base': path.resolve(__dirname, './src/styles/base.scss'),
      '@fonts': path.resolve(__dirname, './src/styles/fonts.scss'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'colors-and-type.html',
      template: './src/pages/ui-kit-colors-and-type/ui-kit-colors-and-type.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'form-elements.html',
      template: './src/pages/ui-kit-form-elements/ui-kit-form-elements.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'cards.html',
      template: './src/pages/ui-kit-cards/ui-kit-cards.pug',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_models/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },

      },
    ],
  },
};
