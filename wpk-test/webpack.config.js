module.exports = {
	entry: './src/js/show.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	devServer: {
		port: 8081
	}

}