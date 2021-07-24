const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const paths = require('./path')

const PORT = 8080

module.exports = merge(common, {
	// set the made to development or production
	mode: 'development',
	// Control how source maps are generated
	devtool: 'inline-source-map',
	// Spin up a server for quick development
	devServer: {
		historyApiFallback: true,
		contentBase: paths.build,
		open: true,
		compress: true,
		hot: true,
		port: PORT,
	},
	module: {
		rules: [
			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
					},
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
		],
	},
	plugins: [
		// Only update what has changed on hot reload
		new webpack.HotModuleReplacementPlugin(),
	],
})
