require('./index.css');
require('page/common/topbar/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart    = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		productId : _mm.getUrlParam('productId') || ''
	},
	init: function(){
        this.loadDetail();
        this.bindEvent();
	},
	//预览图片 attr()获取src地址；
	bindEvent: function(){
		var _this = this;
		$(document).on('mouseover','.intro-picItem',function(){
			var picUrl = $(this).find('.picItem').attr('src');
			$('.mainPic').attr('src',picUrl);
		})
		//添加购物车
		$(document).on('click','.cart-add',function(){
			_cart.addToCart({
				productId: _this.data.productId,
				count: 1   //默认提交数量为1
			},function(res){
				window.location.href = './result.html';
			},function(errMsg){
				alert('添加失败');
			})
		})
	},
	//初始加载页面
	loadDetail : function(){
		var _this = this;
		var productId = _this.data.productId;
		// var productId = '1232222';
		if(!productId){
            _mm.goHome();
		}
		var _this = this; 
		_product.getProductDetail(productId,function(res){
			//处理返回的信息
            _this.filter(res);
            console.log(res);
            var detail = _mm.renderHtml(templateIndex,res);
            $('.list-content').html(detail);
            $('.search-subtitle').text(res.subtitle);
		},function(errMsg){
			$('.list-content').html('<p class="show-error">获取商品失败！</>')
		})
	},
    //返回的subImages为一串包含图片地址的字符串，需要分割为数组
	filter: function(data){
        data.subImages = data.subImages.split(',');
	}
}
$(function(){
	page.init();
})
