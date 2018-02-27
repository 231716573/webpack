const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack =require('webpack')

let cleanPath = [
	'dist'
]

let extractPlugin = new ExtractTextPlugin({
	filename: 'css/[name].css'
})

module.exports = {
	entry: {
		'index': './src/index.js',
		'games': './src/games.js',
		'question': './src/question.js',
		'ranking': './src/ranking.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].js',
	},
	devtool: 'eval-source-map',
	devServer: {
		port: 9000,
		compress: true
	},
	plugins: [
		extractPlugin,
		new CleanWebpackPlugin(cleanPath),
		new webpack.ProvidePlugin({
		    $: 'jquery'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			hash: true,
			excludeChunks: ['games', 'question', 'ranking']
		}),
		new HtmlWebpackPlugin({
			template: './src/games.html',
			filename: 'games.html',
			hash: true,
			excludeChunks: ['index', 'question', 'ranking']
		}),
		new HtmlWebpackPlugin({
			template: './src/question.html',
			filename: 'question.html',
			hash: true,
			excludeChunks: ['index', 'games', 'ranking']
		}),
		new HtmlWebpackPlugin({
			template: './src/ranking.html',
			filename: 'ranking.html',
			hash: true,
			excludeChunks: ['index', 'question', 'games']
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractPlugin.extract({
					fallback: "style-loader",
					use: 'css-loader'
				})
			}, {
				test: /\.styl$/,
				use: extractPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'stylus-loader'
					}]
				})
			}, {
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 500000
						}
					}
				]
			}, {
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {}
				}]
			}
		]
	}
}