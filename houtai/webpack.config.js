const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let clearPath = [
	'dist'
]

let plugin = new ExtractTextPlugin({
	filename: 'css/[name].css',
	ignoreOrder: true
})

module.exports = {
	entry: {
		"login": "./src/login.js",
		"list": "./src/list.js",
		'addschool': "./src/addschool.js",
		"chargeList": "./src/chargeList.js",
		"schoolList": "./src/schoolList.js"
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
		plugin,
		new CleanWebpackPlugin(clearPath),
		new HtmlWebpackPlugin({
			template: './src/login.html',
			filename: 'login.html',
			hash: true,
			excludeChunks: ['list', 'addschool', 'chargeList', 'schoolList']
		}),
		new HtmlWebpackPlugin({
			template: './src/list.html',
			filename: 'list.html',
			hash: true,
			excludeChunks: ['login', 'addschool', 'chargeList', 'schoolList']
		}),
		new HtmlWebpackPlugin({
			template: './src/addschool.html',
			filename: 'addschool.html',
			hash: true,
			excludeChunks: ['list', 'login', 'chargeList', 'schoolList']
		}),
		new HtmlWebpackPlugin({
			template: './src/charge_list.html',
			filename: 'charge_list.html',
			hash:true,
			excludeChunks: ['list', 'addschool', 'login', 'schoolList']
		}),
		new HtmlWebpackPlugin({
			template: './src/school_list.html',
			filename: 'school_list.html',
			hash:true,
			excludeChunks: ['list', 'addschool', 'chargeList', 'login']
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: plugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
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
			}, {
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/'
						}
					}, {
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true
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