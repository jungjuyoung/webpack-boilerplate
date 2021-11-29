const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const childProcess = require('child_process')

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
    compress: true,
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
              collapseWhitespace: true,
              removeComments: true,
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
      word: JSON.stringify(
        '이곳은 전역변수로 접근해서 값을 읽어올 수 있는 웹팩 정의형 플러그인이다.'
      ),
      'api.domain':
        process.env.NODE_ENV === 'production'
          ? JSON.stringify(`http://api.domain.com`)
          : JSON.stringify(`http://dev.api.domain.com`),
    }),
    new CleanWebpackPlugin(),
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
    ],
  },
}
