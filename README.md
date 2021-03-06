# webpack
webpack教程

### 参考网站：
* https://www.rails365.net/articles/webpack-3-ling-ji-chu-ru-men-jiao-cheng-1-jie-shao
* http://webpackbook.rails365.net/479611
* http://www.cnblogs.com/hezihao/p/8022831.html
* 视频: http://v.youku.com/v_show/id_XMjY4MzM5MjM2OA==.html?spm=a2hzp.8253876.0.0&f=49394464

### webpack 命令汇总：
* webpack --watch   // 监听变动并自动打包
* webpack -d   // 生成 source map 映射文件，告知哪些模块被最终打包到哪里了其中的
* webpack -p   // 压缩代码成一行
* webpack --progress   // 显示进度条
* webpack --config XXX.js   // 使用另一份配置文件（比如webpack.config2.js）来打包

### github提交代码不用输入账号密码：
在 .git 文件夹里面的 config 文件最后添加：   
``` 
[credential]
	helper = store
```


### 1. 安装 nodejs

#### 1.1、在浏览器输入下面的网址：

```
https://nodejs.org/en/
```

#### 1.2、最后打开命令行终端，输入以下命令。

```
node -v  // 查看所安装 nodejs 的版本
```


### 2. 安装 webpack

#### 2.1、在命令行终端上输入以下命令：

```
npm install -g webpack 
```

#### 2.2、检测一下是否把 webpack 安装成功了。

```
webpack -v  // 输出webpack 的版本
```


### 附加3. 初始化项目
#### 1.用 npm init 初始化项目
```
# 随便进一个目录
$ cd ~/codes
# 创建一个存放 webpack 项目的目录，名为 hello-webpack
$ mkdir hello-webpack
$ npm init
```
之后你会看到会提示你输入一些内容，你不用管，直接全部回车：   
```
name: (hello-wepback)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
```
最后，你会发现 hello-webpack 目录下多出了一个名为 package.json 的文件。   
内容如下：
```
{
  "name": "hello-wepback",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
#### 2. 集成 webpack
我们在终端上输入如下命令：   
```
npm install --save-dev webpack
```
我们再来看看 package.json 这个文件的内容。多了下面这几行：   
```
"devDependencies": {
  "webpack": "^3.8.1"
}
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

#### 4.1. 打开 package.json 文件
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

#### 4.2. 改动的内容主要是增加了下面几行：
```
  "scripts": {
    "dev": "webpack -d --watch",
    "prod": "webpack -p"
  },
```
用法：```npm run dev```  和   ```npm run prod```
会发现 ```npm run dev``` 和 ```webpack -d --watch``` 的效果是一样的。

-d 这个参数之前没介绍过，它的意思就是说包含 source maps   
这个有什么用呢，就是让你在用浏览器调试的时候，可以很方便地定位到源文件


### 5. webpack 插件 html-webpack-plugin

#### 5.1. 安装 html-webpack-plugin
```
npm install html-webpack-plugin --save-dev
```
安装成功后，package.json 这个文件会多出一行 ```"html-webpack-plugin": "^2.30.1"```

#### 5.2. 用 html-webpack-plugin 这个插件来自动生成 dist/index.html

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
#### 5.3. html-webpack-plugin功能
* 3.1 template   // 有时候我们要让 index.html 根据我们的意愿来生成。就是说它的内容是我们自己定的  
* 3.2 filename   // 默认情况下生成的 html 文件叫 index.html，但有时候你不想叫这个名字，可以改
* 3.3 minify: {collapseWhitespace: true,}  //这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
* 3.4 hash       // 为了更好的 cache，可以在文件名后加个 hash。

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
#### 6.1. 什么是 loader
说白了，就是 loader 类似于 task，能够处理文件，比如把 Scss 转成 CSS，TypeScript 转成 JavaScript 等。

#### 6.2. 用 css-loader 和 style-loader 处理 CSS
6.2.1 安装 css-loader style-loader
```
npm install --save-dev css-loader style-loader
```
	
6.2.2 处理 webpack.config.js
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
##### 6.2.2 附加---处理 Stylus
```
npm install --save-dev stylus-loader stylus
```
处理 webpack.config.js
```
...
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
```


6.2.3 用 extract-text-webpack-plugin 把 CSS 分离成文件   

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

### 7. 初识 webpack-dev-server
我们之前使用 ```webpack -d --watch``` 来在开发环境下编译静态文件，但是这个功能，完全可以用 ```webpack-dev-server``` 来代替。

除此之外， webpack-dev-server 还有其他的功能，比如在本地上开启服务，打开浏览器等。

```
// 先全局安装
npm install -g webpack-dev-server
npm install --save-dev webpack-dev-server
```

然后运行命令：
```webpack-dev-server```


现在我们用浏览器打开 localhost:8080 也可以看到以前的效果。

// 默认是运行在 8080 端口，这个我们可以改。

修改 webpack.config.js 为：
```
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  ...
  devServer: {
    port: 9000,
    open: true    // 运行 webpack-dev-server 的时候就自动打开浏览器。
  },
  ...
};
```



### 8. babel 入门指南
可能你不懂 babel 是什么，你可以把它理解为编译器，它能把 react 代码转成一般浏览器可读可执行的代码，
通常可以用它来转化 react 或 vue 这样的前端代码，
或者把 es6 代码转成普通的 javascript 代码等等。

#### 8.1 安装插件，运行下面的命令
```
npm install --save-dev babel-core babel-preset-es2015 babel-preset-react
```


#### 8.2 安装babel-loader，把es6转成es5
```
npm install --save-dev babel-loader
```

webpack.config.js
```
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  ...
  module: {
		rules: [
    	{
      	test: /\.css$/,
      	use: ExtractTextPlugin.extract({
      		fallback: 'style-loader',
      		use: ['css-loader']
      	})
    	},
    	// 这两行是处理 js/es6 相关的内容
    	{
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
};
```

### 9. 用 clean-webpack-plugin 来清除文件

其实 clean-webpack-plugin 很容易知道它的作用，就是来清除文件的。   

一般这个插件是配合 webpack -p 这条命令来使用，就是说在为生产环境编译文件的时候，先把 build或dist (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。  

安装：
```
npm i clean-webpack-plugin --save-dev
```

webpack.config.js
```
const path = require('path')
...
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
	'dist'
]

module.exports = {
	entry: './src/app.js',
	...
	plugins: [
		new CleanWebpackPlugin(pathsToClean),
		new ExtractTextPlugin("styles.css"),
		new HtmlWebpackPlugin({
			template: './src/zhongqiu.html',
			filename: 'index.html',
			hash: true
		})
	],
	...
}
```

现在运行 npm run prod 试试，只有下面的文件：
```
dist
├── app.bundle.0e380cea371d050137cd.js
├── index.html
└── style.css
```


### 10. 配置多个 HTML 文件
之前我们只写了一个 html 文件，就是 src/index.html，但是有时候我们是需要多个的，这个时候，怎么办呢？

## 不是很彻底看得懂，先忽略，哈哈哈，好尴尬。。。


### 11. 如何使用模块热替换 HMR 来处理 CSS

模块热替换 是什么意思？   

以前我们使用的 ```webpack --watch``` 或 ```webpack-dev-server``` 的功能是监听文件改变，就自动刷新浏览器，    
而这个模块热替换不用刷新浏览器，它是只让修改到的模块，才会在浏览器上发生相应的变化，就是生效，而不是重新刷新浏览器。  

为什么要这么做呢？有时候模块越多，改得频繁，刷新起来还是很慢的，效率低呀。   

所以有了 模块热替换 的功能，我们来试一下，让我们一改 CSS 然后浏览器不用刷新就会让页面生效改变。

#### 11.1 启用 HMR

webpack.config.js 改成：
```
devServer: {
  port: 9000,
  open: true,
  hot: true
}
```

然后现在看到的 webpack.config.js 如下
```
const webpack = require('webpack');
...

let pathsToClean = [
	'dist'
]

module.exports = {
	entry: './src/app.js',
	...
	plugins: [
		new CleanWebpackPlugin(pathsToClean),
		new ExtractTextPlugin("styles.css"),
		new HtmlWebpackPlugin({
			template: './src/zhongqiu.html',
			filename: 'index.html',
			hash: true
		}),
		// 这两行是新增的
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	...
}
```

文件名还不能用 chunkhash 了，它说要用 hash 来代替 chunkhash。  

我们来改一下：
```
filename: '[name].[chunkhash].js'
```
变成
```
filename: '[name].[hash].js'
```

#### 11.2 处理 extract-text-webpack-plugin
extract-text-webpack-plugin 这个插件来处理 CSS 的，在用 HMR 的时候要先把它关闭一下。

用一个参数 disable: true 就可以关闭掉。

webpack.config.js
```
new ExtractTextPlugin("style.css")
```
变成
```
new ExtractTextPlugin({
  filename: 'style.css',
  disable: true
}),
``` 

然后把处理 scss 文件的 loader 部分变成类似下面这样：
```
...
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    //resolve-url-loader may be chained before sass-loader if necessary
    use: ['css-loader', 'sass-loader']
  })
...
```
变成 
```
...
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
...
```


### 12. 生产环境 vs 开发环境

要让生产环境使用 extract-text-webpack-plugin 这个插件，而开发环境不使用，如何做到呢？

其实原理很简单，只要能区分出哪个是开发环境，哪个是生产环境就可以，只要判断是生产环境的时候就用，不是的话，就不用，就可以了。


#### 12.1. 增加环境变量

首先来看一下之前的开发环境和生产环境分别使用的编译命令：   

package.json
```
"scripts": {
  "dev": "webpack-dev-server",
  "prod": "webpack -p"
},
```
分别是开发环境使用的 npm run dev 命令和生产环境使用的 npm run prod 命令。  

我们把它改成下面这样：
```
"scripts": {
  "dev": "webpack-dev-server",
  "prod": "NODE_ENV=production webpack -p"
},
```

#### 12.2. 使用环境变量

在 webpack.config.js 文件中：
```
var isProd = process.env.NODE_ENV === 'production'; // true or false
``` 
process.env.NODE_ENV 就能得到之前设置的变量，    
如果运行的是 ```npm run prod```，那么process.env.NODE_ENV 的值就是 production，那 isProd 就是 true，    
如果运行的是 ```npm run dev```，isProd 就是 false，因为 npm run dev 没有设置这个 NODE_ENV 这个环境变量嘛。

我们把 webpack.config.js 中的代码更改如下：
```
...

var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  //resolve-url-loader may be chained before sass-loader if necessary
  use: ['css-loader', 'sass-loader']
})

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  ...
  plugins: [
    ...
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: !isProd
    }),
    ...
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      ...
    ]
  }
};
```

只要能区别出不同的环境，使用不同的配置内容就可以了。

现在就可以放心地使用 ```npm run dev``` 和 ```npm run prod``` 命令了，再也不用临时关掉一些插件了。


### 13. devtool: 'source-map' 是什么意思
有时候，在看别人的 webpack.config.js 文件的配置时，常看到这么一行：
```
devtool: 'source-map'
```

#### 13.1 使用 devtool: 'source-map'
在 webpack.config.js 文件中谈价 devtool: 'source-map'，如下所示
```
module.exports = {
	entry: {
		...
	},
	devtool: 'source-map'  // 这样就能够查看哪里报错并指导错误的源文件
}
```

devtool 的7种模式：   

1、 ```eval```                 // 每个module会封装到eval里包裹起来执行，并且在末尾追加注释   
2、 ```source-map```          // 生成一个SourceMap 文件   
3、 ```hidden-source-map```   // 和source-map 一样，但不会在 bundle 末尾注释   
4、 ```inline-source-map```   // 生成一个DataUrl 形式的 SourceMap 文件   
5、 ```cleap-source-map```    // 生成一个没有列信息(column-mappings) 的SourceMap 文件，不包含 loader 的sourcemap   
6、 ```eval-source-map```     // 每个 module 会通过 eval() 来执行，并且生成一个 DataUrl 形式的SourceMap   
7、 ```cheap-module-source-map```   // 生成一个没有列信息(column-mappings) 的SourceMap 文件，包含 loader 的sourcemap   


### 14. 如何打包图片
安装 url-loader
```
npm install url-loader --save-dev
```
此时 webpack.config.js
```
...
module.exports = {
	...
	module: {
		rule: [
			...
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000
            }
          }
        ]
			}
		]
	}
}
```

#### 14.1 解析 html 代码里面的 img 标签
安装 html-loader
```
npm install html-loader --save-dev
```
webpack.config.js :
```
{
	test: /\.html$/,
	use: [{
		loader: 'html-loader',
		options: {
			minimize: true
		}
	}]
}
```
