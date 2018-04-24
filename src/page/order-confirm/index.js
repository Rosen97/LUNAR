require('./index.css');
var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _order = require('service/order-service.js');
var _cities = require('util/cities/index.js');
var _modal = require('./modal.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var templateModal   = require('./modal-wrap.string');


var page = {
	data: {
        isActive: false
	},
    init: function(){
        this.loadProductList();
        this.bindEvent();
        //执行modal.js的init()函数
        _modal.init();
    },
    bindEvent: function(){
        var _this = this;
    	$(document).on('click','.address-item',function(){
    		$(this).addClass('active').siblings().removeClass('active');
    		$(this).find('.user-action').addClass('active')
    		      .parents('.address-item').siblings('.address-item').find('.user-action').removeClass('active');
    		//获取选择地址id
    		_modal.data.selectedAddressId = $(this).attr('data-id');
    	})

        //编辑 删除点击
    	$(document).on('click','.user-action',function(){
    		var type = $(this).hasClass('edit')  ? 'edit' : 'delete';
            //获取当前编辑的地址id
            var addressId = _modal.data.selectedAddressId;
    		if(type === 'edit'){
    			$('.modal').show();
                _address.getAddress(addressId,function(res){
                    _modal.renderModal(res);
                },function(errMsg){
                    errorTips(errMsg);
                })
    		}
    		if(type === 'delete'){
    			if(window.confirm("确认要删除改地址吗？")){
                    _address.deleteAddress(addressId,function(res){
                        _modal.loadAddressList();
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    })
                }
    		}
    	})
        //添加地址
        $(document).on('click','.address-add',function(){
            $('.modal').show();
            _modal.renderModal();
            //添加地址 data-id设置为0，编辑地址 data-id不为0
            $('.modal-wrap').attr('data-id','0');
        })
        // 确认订单
    	$(document).on('click','.order-submit',function(){
    		var shippingId = _modal.data.selectedAddressId;
    		if(shippingId){
    			// 提交订单需要传地址参数
                _order.createOrder({
                    shippingId : shippingId
                }, function(res){
                    window.location.href = './order-list.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg)
                });
    		}else{
                alert('地址不能为空！');
    		}
    	})
    },
    loadProductList: function(){
    	_order.getProductList(function(res){
            var productHtml = _mm.renderHtml(templateProduct,res);
            $('.section-body').html(productHtml);
    	},function(errMsg){
            _mm.errorTips(errMsg);
    	})
    }
}

$(function(){
	page.init();
})