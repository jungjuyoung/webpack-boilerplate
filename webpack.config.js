const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const childProcess = require('child_process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const apiMocker = require('connect-api-mocker');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let mode = process.env.NODE_ENV || 'development';
console.log(`webpack.config.js process.env.NODE_ENV: ${process.env.NODE_ENV}`);
const port = 8000;
const serverPOSRT = 8001;

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
    port,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
    onBeforeSetupMiddleware: devServer => {
      //   // devServer.app.get('/api/users', (req, res) => {
      //   //   res.json([
      //   //     { id: 1, name: 'Nadia' },
      //   //     { id: 2, name: 'Bek' },
      //   //     { id: 3, name: 'Chris' },
      //   //   ]);
      //   // });
      devServer.app.use(apiMocker('/api', 'mock/api'));
    },
    proxy: {
      '/api/*': {
        target: `http://localhost:${serverPOSRT}`, // 서버포트
        changeOrigin: true,
      },
    },
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './node_modules/axios/dist/axios.min.js',
          to: './axios.min.js',
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer:
      mode === 'production'
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
  },
  externals: {
    // 웹팩이 빌드할때 axios를 전역변수에 넣어놓고 전역변수 axios를 사용하라는 것.
    // 주로 node_modules에 있는 이미 빌드된 파일들은 또 빌드할 필요없이 바로 사용하면 됨.
    // 빌드 될 때 axios를 html에서 사용하려면 이것을 copy해야함.
    axios: 'axios',
  },
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
            ? MiniCssExtractPlugin.loader //
            : 'style-loader', // create style nodes from JS strings
          'css-loader', // translates css into commonJS
          'postcss-loader', // morder css like auto prefix
          'sass-loader', //compiles scss to css
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
};
