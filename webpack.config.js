const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const childProcess = require('child_process')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

module.exports = {
  mode,
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
    port: 8000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `FrontEnd Boilerplate (${mode})`,
      template: path.resolve(__dirname, './src/template.html'), // template file
      filename: 'index.html', // output file
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸제거
              removeComments: true, // 주석제거
            }
          : false,
    }),
    new webpack.BannerPlugin({
      banner: `
      Build Date: ${new Date().toISOString().split('T')[0]}
      Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
      Author: ${childProcess.execSync('git config user.name')}
      `,
    }),
    new webpack.DefinePlugin({
      'api.domain':
        process.env.NODE_ENV === 'production'
          ? JSON.stringify(`http://api.domain.com`)
          : JSON.stringify(`http://dev.api.domain.com`),
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: path.resolve(__dirname, './my-webpack-loader.js'),
        use: ['babel-loader'],
      },

      // CSS, PostCss, and Sass
      {
        test: /\.(sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // Images
      {
        test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
        type: 'asset', // according to the default conditions automatically selects between resource and inline
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // less than 20KB
          },
        },
      },

      // Font and SVGs
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline', // previously, the url-loader was responsible.
        use: [
          {
            options: {
              name: 'assets/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
}
