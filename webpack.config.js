const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGES_DIR = path.resolve(__dirname, 'src/pages');
const PAGES = fs.readdirSync(PAGES_DIR);

console.log('pages--->', PAGES);
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

    ...PAGES.map(
      (page) => new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `${PAGES_DIR}/${page}/${page}.pug`,
      }),
    ),

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
        type: 'asset/inline',
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
