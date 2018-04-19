require('./index.css');
require('page/common/topbar/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart    = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	init: function(){
		this.bindEvent();
		this.loadCartList();
	},
	bindEvent: function(){
		var _this = this;
		//全选 单选  点击全选或多选都需要重新加载购物车列表 renderCart()
		$(document).on('click','.all-checked',function(){
			if($(this).is(':checked')){
				_cart.selectAllProduct(function(res){
                    _this.renderCart(res);
				},function(errMsg){
                    _mm.errorTips(errMsg);
				}) 
			}else{
				_cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
				},function(errMsg){
                    _mm.errorTips(errMsg);
				}) 
			}
		})
		$(document).on('click','.product-checked',function(){
			//单选需要传入对应的productId
			var productId = $(this).parents('.cart-cell').data('product-id');
			if($(this).is(':checked')){
				_cart.selectProduct(productId,function(res){
                    _this.renderCart(res);
				},function(errMsg){
                    _mm.errorTips(errMsg);
				}) 
			}else{
				_cart.unselectProduct(productId,function(res){
                    _this.renderCart(res);
				},function(errMsg){
                    _mm.errorTips(errMsg);
				}) 
			}
		})

        //商品数量变化
        $(document).on('click','.col-num-change .link',function(){
        	var count = parseInt($(this).siblings('.num-text').val()),
        	    newCount = 0,
        	    minCount = 1,
        	    maxCount = $(this).siblings('.num-text').data('max'),
        	    type = $(this).hasClass('num-plus') ? 'plus' : 'minus'
        	    productId = $(this).parents('.cart-cell').data('product-id');
        	if(type === 'plus'){
        		if(count >= maxCount){
        			alert('商品超过最大购买限制！')
        		}
        		newCount = count + 1;
        	}
        	if(type === 'minus'){
        		if(count <= minCount){
        			return;
        		}
        		newCount = count - 1;
        	}
        	//更新购物车商品个数
        	_cart.updateProduct({
        		productId: productId,
        		count: newCount
            },function(res){
                _this.renderCart(res);
        	},function(errMsg){
               _mm.errorTips(errMsg);
        	})
        })
		//删除商品，单个删除
		$(document).on('mouseover','.col-action .fa',function(){
	    	$(this).removeClass('fa-times').addClass('fa-times-circle');
		})
		$(document).on('mouseout','.col-action .fa',function(){
	    	$(this).removeClass('fa-times-circle').addClass('fa-times');
		})

        $(document).on('click','.delete-product',function(){
        	if(window.confirm("确定要删除该商品吗？")){
        		var productId = $(this).parents('.cart-cell').data('product-id');
	        	_cart.deleteProduct(productId,function(res){
	                _this.renderCart(res);
	        	},function(errMsg){
	                _mm.errorTips(errMsg);
	        	})
        	}
        })
        //提交订单
        $(document).on('click','.cart-submit',function(){
            window.location.href = './order-confirm.html';
        })
	},
	loadCartList: function(){
		var _this = this;
        _cart.getCartList(function(res){
            console.log(res);
            _this.renderCart(res);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
	},
	renderCart: function(data){
		//购物车数量同步
		_cart.getCartCount(function(res){
			$('.topbar-nav .cart-count').text(res);
			// $('.total-num').text(res); 
			// 购物车与总计商品个数一致，该方法初始数量会闪过，体验不好
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
		this.filter(data);//处理返回数据
        var cartHtml = _mm.renderHtml(templateIndex,data);
        $('.cart-con').html(cartHtml);
        //共计商品件数  已选择商品件数 
        // quantity: 商品个数 productChecked: 1代表选中，0代表未选中
        var totalNum = 0,
            selectNum = 0;
        for(var i=0;i<data.cartProductVoList.length;i++){
            totalNum += data.cartProductVoList[i].quantity;
            //true flase -- Boolean和其它变量类型等价变换
            if(data.cartProductVoList[i].productChecked){
                selectNum += data.cartProductVoList[i].quantity;
            }
        }
        $('.total-num').text(totalNum);
        $('.select-num').text(selectNum);
        if(selectNum === 0){
            $('.cart-submit').addClass('empty');
        }

	},
	filter: function(data){
       data.notEmpty = !!data.cartProductVoList.length;
	}

}

$(function(){
	page.init();
})
