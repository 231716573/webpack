# webpack
webpack教程


### 1. 安装 nodejs

1、在浏览器输入下面的网址：

	```
	https://nodejs.org/en/
	```

2、最后打开命令行终端，输入以下命令。

	```
	node -v  // 查看所安装 nodejs 的版本
	```


### 2. 安装 webpack

1、在命令行终端上输入以下命令：

	```
	npm install -g webpack 
	```

2、检测一下是否把 webpack 安装成功了。

	```
	webpack -v  // 输出webpack 的版本
	```


### 3. 创建配置文件 webpack.config.js

	内容如下：

	```
	module.exports = {
	  entry: './src/app.js',
	  output: {
	    filename: './dist/app.bundle.js'
	  }
	}
	```

	简单解释一下： 
		1、entry 表示源文件，output 这边表示的是输出的目标文件。
	用法：
		直接在终端上输入 webpack 就可以了。webpack 命令会去找 webpack.config.js 文件，并读取它的内容（源文件和目标文件），最后进行相应的处理。


### 4. 改造 package.json 的scripts 部分

1. 打开 package.json 文件
	```
	{
	  "name": "hello-wepback",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "dev": "webpack -d --watch",
	    "prod": "webpack -p"
	  },
	  "author": "",
	  "license": "ISC",
	  "devDependencies": {
	    "webpack": "^3.8.1"
	  }
	}
	```

2. 改动的内容主要是增加了下面几行：
	```
	  "scripts": {
	    "dev": "webpack -d --watch",
	    "prod": "webpack -p"
	  },
	```
	用法：```npm run dev```  和   ```npm run prod```
	会发现 ```npm run dev``` 和 ```webpack -d --watch``` 的效果是一样的。

	-d 这个参数之前没介绍过，它的意思就是说包含 source maps，这个有什么用呢，就是让你在用浏览器调试的时候，可以很方便地定位到源文件


### 5. webpack 插件 html-webpack-plugin

1. 安装 html-webpack-plugin
	```
	npm install html-webpack-plugin --save-dev
	```

	安装成功后，package.json 这个文件会多出一行 "html-webpack-plugin": "^2.30.1"

2. 用 html-webpack-plugin 这个插件来自动生成 dist/index.html

	把 webpack.config.js 文件改一下
	```
	var HtmlWebpackPlugin = require('html-webpack-plugin');

	module.exports = {
	  entry: './src/app.js',
	  output: {
	    path: __dirname + '/dist',
	    filename: 'app.bundle.js'
	  },
	  plugins: [new HtmlWebpackPlugin()]
	};
	```
3. html-webpack-plugin功能
	3.1 template   // 有时候我们要让 index.html 根据我们的意愿来生成。就是说它的内容是我们自己定的
	3.2 filename   // 默认情况下生成的 html 文件叫 index.html，但有时候你不想叫这个名字，可以改
	3.3 minify: {collapseWhitespace: true,}  //这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
	3.4 hash       // 为了更好的 cache，可以在文件名后加个 hash。
		```
		plugins: [
			new HtmlWebpackPlugin({
		    template: './src/index.html',
		    filename: 'index.html',
		    minify: {
			    collapseWhitespace: true,
			  },
			  hash: true
		  })
		]
		```

### 6. 使用 loader 处理 CSS 和 Sass、Stylus、Less 等 CSS 扩展语言
1. 什么是 loader
	说白了，就是 loader 类似于 task，能够处理文件，比如把 Scss 转成 CSS，TypeScript 转成 JavaScript 等。

2. 用 css-loader 和 style-loader 处理 CSS
	2.1 安装 css-loader style-loader
	```
		npm install --save-dev css-loader style-loader
	```
	
	2.2 处理 webpack.config.js
	```
		var HtmlWebpackPlugin = require('html-webpack-plugin');

		module.exports = {
		  entry: './src/app.js',
		  output: {
		    path: __dirname + '/dist',
		    filename: 'app.bundle.js'
		  },
		  plugins: [new HtmlWebpackPlugin({
		    template: './src/index.html',
		    filename: 'index.html',
		    minify: {
		      collapseWhitespace: true,
		    },
		    hash: true,
		  })],
		  module: {
		    rules: [
		      {
		        test: /\.css$/,
		        use: [ 'style-loader', 'css-loader' ]
		      }
		    ]
		  }
		};
	```

	2.3 用 extract-text-webpack-plugin 把 CSS 分离成文件
	有时候我们要把 SASS 或 CSS 处理好后，放到一个 CSS 文件中，用这个插件就可以实现。
	```
		npm install --save-dev extract-text-webpack-plugin
	```
	修改 webpack.config.js 为：
	```
		var HtmlWebpackPlugin = require('html-webpack-plugin');
		var ExtractTextPlugin = require('extract-text-webpack-plugin');

		module.exports = {
			entry: './src/app.js',
			output: {
				path: __dirname + '/dist',
				filename: 'app.bundle.js'
			},
			plugins: [
				new ExtractTextPlugin("styles.css"),
				new HtmlWebpackPlugin({
					template: './src/zhongqiu.html',
					filename: 'index.html',
					hash: true
				})
			],
			module: {
				rules: [
		    	{
		      	test: /\.css$/,
		      	use: ExtractTextPlugin.extract({
		      		fallback: 'style-loader',
		      		use: ['css-loader']
		      	})
		    	}
		    ]
			}
		};
	```
