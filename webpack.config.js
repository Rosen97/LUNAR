 
 var webpack = require('webpack');
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin = require("html-webpack-plugin");

 //环境变量配置.dev /online
 var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

 //获取html-webpack-plugin参数的方法
 var getHtmlconfig = function(name,title){
 	return {
		template : './src/view/' + name + '.html',
		filename : 'view/' + name + '.html',
        title    : title,
		inject   : true,
		hash     : true,
		chunks   : ['common','' + name]
	};
 }
 var config = {
 	entry : {
 		'common': ['./src/page/common/index.js'],//公共模块文件引用
        'index' : ['./src/page/index/index.js'],
        'result' : ['./src/page/result/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],//用户
        'user-register' : ['./src/page/user-register/index.js'],
        'password-update' : ['./src/page/password-update/index.js'],
        'list' : ['./src/page/list/index.js'],//商品列表
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js']
 	},//入口文件 js多入口处理方式 
 	output: {             //出口文件
 		path: './dist',
 		publicPath: '/dist',//实现页面实时更新
 		filename: 'js/[name].js'//输出多个文件
 	},
    externals : {
    	'jquery' : 'window.jQuery'  //jquery模块引用
    },
    //webpack对样式的处理
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader" , "css-loader")},//探测到已css结尾的文件使用css/style-loader
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}, //webpack对图片的处理  linmit=100限制文件名大小 否则会以base64为字符作为文件地址
            //woff svg eot ttf为常用字体格式
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    //便于添加文件
    resolve : {
    	alias : {
            node_modules    : __dirname + '/node_modules',
    		util            : __dirname + '/src/util',
    		page            : __dirname + '/src/page',
    		service         : __dirname + '/src/service',
    		image           : __dirname + '/src/image'
    	}
    },
    plugins: [
        //独立通用模块到ja/base.js
    	new webpack.optimize.CommonsChunkPlugin({
    		name : 'common',
    		filename : 'js/base.js'//所有的filename输出文件都是基于dist文件下
    	}),
    	//css单独打包
    	new ExtractTextPlugin("css/[name].css"),
    	//webpack对html模板处理
        new HtmlWebpackPlugin(getHtmlconfig('index', 'LUNAR-首页')),
        new HtmlWebpackPlugin(getHtmlconfig('result', 'LUNAR-操作结果')),
    	new HtmlWebpackPlugin(getHtmlconfig('user-login', 'LUNAR-用户登陆')),
        new HtmlWebpackPlugin(getHtmlconfig('user-register', 'LUNAR-用户注册')),
        new HtmlWebpackPlugin(getHtmlconfig('password-update', 'LUNAR-更改密码')),
        new HtmlWebpackPlugin(getHtmlconfig('list', 'LUNAR-商品列表')),
        new HtmlWebpackPlugin(getHtmlconfig('detail', 'LUNAR-商品详情')),
        new HtmlWebpackPlugin(getHtmlconfig('cart', 'LUNAR-购物车')),
        new HtmlWebpackPlugin(getHtmlconfig('order-confirm', 'LUNAR-订单确认')),
         new HtmlWebpackPlugin(getHtmlconfig('order-list', 'LUNAR-订单列表'))
    ]
 };

 //判断是online还是env
 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:3000/');
 }
 module.exports = config;//定义一个对象存储module.exports，然后在输出给config