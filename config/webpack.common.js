const paths = require('./path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
	// where webpack looks to start building the bundle
	entry: {
		app: [
			paths.src + '/index.js',
		],
	},
	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	resolve: {
		modules: [
			paths.src,
			'node_modules',
		],
		extensions: [
			'.js',
			'.jsx',
			'.json',
		],
		alias: {
			'@': paths.src,
		},
	},
	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{
				test: /\.(js | jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader', // without additional settings, this will reference .babelrc file.
				],
			},

			// Images: Copy image files to build folder
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},

			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
		],
	},
	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		// Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public,
					to: 'assets',
					globOptions: {
						ignore: [
							'*.DS_Store',
						],
					},
					noErrorOnMissing: true,
				},
			],
		}),
		// Generates an HTML file from a template
		// Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: 'webpack Boilerplate',
			template: paths.src + '/index.html', // template file
			filename: 'index.html', // output file
		}),
		// ESLint configuration
		new ESLintPlugin({
			files: [
				'.',
				'src',
				'config',
			],
			formatter: 'table',
		}),
		// Prettier configuration
		new PrettierPlugin(),
	],
}
