require('./index.css');
var _mm = require('util/mm.js');
var _address    = require('service/address-service.js');
var templateModal = require('./modal.string');
var templateAddress = require('./address.string');

var addressModal = {
	data: {
		selectedAddressId: null
	},
	init: function(){
		this.bindEvent();
		this.loadAddressList();
	},
	bindEvent: function(){
		var _this = this;
        $(document).on('click','.address-btn',function(){
       	   var type = $(this).hasClass('save') ? 'save' : 'cancel';
       	   var addressInfo = {
   	   	   	   id: $(this).parents('.modal-wrap').attr('data-id'),
   	   	   	   receiverName: $.trim($('.modal-name').val()),
   	   	   	   receiverPhone: $.trim($('.modal-phone').val()),
   	   	   	   receiverProvince: $.trim($('.modal-province').val()),
   	   	   	   receiverCity: $.trim($('.modal-city').val()),
   	   	   	   receiverAddress: $.trim($('.modal-address').val()),
   	   	   	   receiverZip: $.trim($('.modal-zip').val())
   	   	   }
       	   if(type === 'save'){
       	   	   if(addressInfo.id){
	       	   	   _address.update(addressInfo,function(res){
	                   _this.loadAddressList();
	       	   	   },function(errMsg){
	       	   	   	    _mm.errorTips(errMsg);
	       	   	   })
       	   	   }else{
       	   	   	   _address.save({
		   	   	   	   receiverName: $.trim($('.modal-name').val()),
		   	   	   	   receiverPhone: $.trim($('.modal-phone').val()),
		   	   	   	   receiverProvince: $.trim($('.modal-province').val()),
		   	   	   	   receiverCity: $.trim($('.modal-city').val()),
		   	   	   	   receiverAddress: $.trim($('.modal-address').val()),
		   	   	   	   receiverZip: $.trim($('.modal-zip').val())
		   	   	   },function(res){
	                   _this.loadAddressList();
	       	   	   },function(errMsg){
	       	   	   	    _mm.errorTips(errMsg);
	       	   	   })
       	   	   }
       	   }else{
       	   	   alert('cancel');
       	   }
       	   $('.modal').hide();
       })
       $(document).on('click','.close',function(){
       	   $('.modal').hide();
       })
	},
	renderModal: function(data){
       var modalHtml = _mm.renderHtml(templateModal,data);
       $('.modal').html(modalHtml);   
	},
	loadAddressList : function(){
		var _this = this;
		_this.data.selectedAddressId = null;
        // 获取地址列表
        _address.getAddressList(function(res){
        	console.log(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.section-address').html(addressListHtml);
        }, function(errMsg){
            $('.section-address').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },

}

module.exports = addressModal;
