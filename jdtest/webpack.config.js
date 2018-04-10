const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let cleanPath = [
	'dist'
]

let extractPlugin = new ExtractTextPlugin({
	filename: 'css/[name].css'
})

module.exports = {
	entry: {
		'index': './src/entry/index.js',
		'classify': './src/entry/classify.js',
		'cart': './src/entry/cart.js',
		'personal': './src/entry/personal.js',
		'detail': './src/entry/detail.js',
		'pay': './src/entry/pay.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].js'
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
			excludeChunks: ['classify', 'cart', 'personal', 'detail', 'pay']
		}),
		new HtmlWebpackPlugin({
			template: './src/classify.html',
			filename: 'classify.html',
			hash: true,
			excludeChunks: ['index', 'cart','personal', 'detail', 'pay']
		}),
		new HtmlWebpackPlugin({
			template: './src/cart.html',
			filename: 'cart.html',
			hash: true,
			excludeChunks: ['index', 'classify','personal', 'detail', 'pay']
		}),
		new HtmlWebpackPlugin({
			template: './src/personal.html',
			filename: 'personal.html',
			hash: true,
			excludeChunks: ['index', 'classify','cart', 'detail', 'pay']
		}),
		new HtmlWebpackPlugin({
			template: './src/detail.html',
			filename: 'detail.html',
			hash: true,
			excludeChunks: ['index', 'classify','cart', 'personal', 'pay']
		}),
		new HtmlWebpackPlugin({
			template: './src/pay.html',
			filename: 'pay.html',
			hash: true,
			excludeChunks: ['index', 'classify','cart', 'personal', 'detail']
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
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: 'url-loader'
			}, {
				test: /.html$/,
				use: [{
					loader: 'html-loader',
					options: {}
				}]
			}, {
				test: /\.(jsx|js)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'es2015', 'react'
						]
					}
				}
			}
		]
	}
}