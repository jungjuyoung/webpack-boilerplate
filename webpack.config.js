const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PORT = 8080
const isDevelopment = process.env.NODE_ENV !== 'production'
module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.json',
		],
	},
	devtool: isDevelopment ? false : 'inline-source-map',
	entry: {
		app: [
			'./src/index.js',
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash].bundle.js',
	},
	module: {
		rules: [
			{
				// js
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
					},
				},
			},
			{
				// css
				test: /\.(sc|sa|c)ss$/,
				use: [
					isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				// image
				test: /\.(png|jpe?g|gif)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: PORT,
		hot: true,
		open: true,
	},
}
