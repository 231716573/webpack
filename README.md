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
	};
	```

	简单解释一下： entry 表示源文件，output 这边表示的是输出的目标文件。
	用法：直接在终端上输入 webpack 就可以了。webpack 命令会去找 webpack.config.js 文件，并读取它的内容（源文件和目标文件），最后进行相应的处理。


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
	会发现 npm run dev 和 webpack -d --watch 的效果是一样的。

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