require('./index.css');
var _mm = require('util/mm.js');
var _order    = require('service/order-service.js');
var _address    = require('service/address-service.js');
var addressModal = require('./modal.js');
var templateIndex = require('./index.string');

var page = {
	init: function(){
        this.loadProductList();
        this.bindEvent();
        addressModal.init();
	},
	bindEvent: function(){
		var _this = this;
       $(document).on('click','.address-item',function(){
       	    $(this).addClass('active').siblings('.address-item').removeClass('active');
       	    $(this).find('.user-action').addClass('active').parents('.address-item')
       	    .siblings('.address-item').find('.user-action').removeClass('active');
           addressModal.data.selectedAddressId = $(this).attr('data-address-id');
       })
       // 删除 编辑
       $(document).on('click','.user-action',function(){
       	   var type = $(this).hasClass('delete') ? 'delete' : 'edit';
       	   var addressId = addressModal.data.selectedAddressId;
       	   if(type === 'delete'){
       	   	    if(window.confirm("确认要删除改地址吗？")){
	       	   	    _address.deleteAddress(addressId,function(res){
		                addressModal.loadAddressList();
		       	   	},function(errMsg){
		       	   	   	_mm.errorTips(errMsg);
		       	   	})
       	   	    }
       	   }else{
       	   	   $('.modal').show();
               _address.getAddress(addressId,function(res){
                   addressModal.renderModal(res);
               },function(errMsg){
               	   _mm.errorTips(errMsg);
               })
       	   }
       })
       // 添加
       $(document).on('click','.address-add',function(){
       	   $('.modal').show();
       	   addressModal.renderModal();
       })
       
       //提交订单
       $(document).on('click','.order-submit',function(){
       	   var shippingId = addressModal.data.selectedAddressId;
       	   if(shippingId){
       	   	   _order.createOrder(shippingId,function(res){
                   window.location.href = './order-list.html';
       	   	   },function(errMsg){
       	   	   	   _mm.errorTips(errMsg);
       	   	   })
       	   }else{
       	   	   alert('请选择地址');
       	   }
       })
	},
	loadProductList: function(){
		_order.getProductList(function(res){
            var orderHtml = _mm.renderHtml(templateIndex,res);
            $('.section-body').html(orderHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
	}
}

$(function(){
	page.init();
})