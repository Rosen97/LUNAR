require('./index.css');
require('./index.string');
require('page/common/topbar/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		listParam: {
			keyword  : _mm.getUrlParam('keyword')  || '',
			pageSize : _mm.getUrlParam('pageSize') || '50', //页面最多有商品的个数
		    orderBy  : _mm.getUrlParam('orderBy')  || 'default'//排序判定
        }
	},
    init: function(){
        this.loadList();
        this.bindEvent();
    },
    //加载商品信息
    loadList: function(){
    	var _this = this;
    	var listParam = _this.data.listParam;
    	var listHtml = '';
        _product.getProductList(listParam,function(res){
            // console.log(res);
            listHtml = _mm.renderHtml(templateIndex, {
            	productList: res.list   //index.string中productList
            });
            $('.list-content .product-list').html(listHtml);
            //搜索的商品不存在  => size = 0;
            if(res.size === 0){
            	$('.list-content .product-list')
            	  .html('<p class="search-error">很抱歉，实在找不到你搜索的商品！</p>')
            }
        },function(errMsg){
        	_mm.errorTips(errMsg);
        })
        //LUNAR > 商品列表 > keyword
        $('.search-keyword').text(_this.data.listParam.keyword);
    },
    bindEvent: function(){
        var _this = this;
        //默认 升序 降序排列
        $('.order-list-box .link').click(function(){
            $(this).addClass('active')
                   .parent().siblings().find('.link').removeClass('active');
            //默认
            if($(this).is('.order-list-suggest')){
                _this.data.listParam.orderBy = 'default';
                _this.loadList();
            }
            //升降序
            if($(this).is('.order-list-price')){
                if($('#order-icon').hasClass('fa-long-arrow-down')){
                    $('#order-icon').removeClass('fa-long-arrow-down')
                                    .addClass('fa-long-arrow-up');
                    _this.data.listParam.orderBy = 'price_asc';
                }
                else{
                    $('#order-icon').removeClass('fa-long-arrow-up')
                                    .addClass('fa-long-arrow-down');
                    _this.data.listParam.orderBy = 'price_desc';
                }
                _this.loadList();
            }
        })
    }
}

$(function(){
	page.init();
})