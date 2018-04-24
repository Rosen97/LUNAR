var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js');
var templateModal   = require('./modal-wrap.string');
var templateAddress = require('./address-list.string');
var modal = {
    data: {
        selectedAddressId : null,
    },
    init : function(){
        this.bindEvent();
        this.loadAddressList();
    },
    bindEvent: function(){
    	var _this = this;
        $(document).on('click','.modal .close',function(){
            $('.modal').hide();
        })
        $(document).on('click','.modal-footer .link',function(){
            var type = $(this).hasClass('save') ? 'save' : 'cancel';
            var receiverInfo = {
            	id: $('.modal-wrap').attr('data-id'),
				receiverName: $('.form-name').val(),
				receiverMobile: $('.form-phone').val(),
				receiverProvince: $('.form-province').val(),
				receiverCity: $('.form-city').val(),
				receiverAddress: $('.form-detail-address').val(),
				receiverZip: $('.form-zipcode').val()
			};
            if(type === 'save'){
                if(receiverInfo.id === '0'){
                    _address.save({
                        receiverName: $('.form-name').val(),
                        receiverMobile: $('.form-phone').val(),
                        receiverProvince: $('.form-address').val(),
                        receiverCity: '',
                        receiverAddress: $('.form-detail-address').val(),
                        receiverZip: $('.form-zipcode').val()
                    },function(res){
                        _this.loadAddressList();
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    }) 
                }
                else{
                    _address.update(receiverInfo,function(res){
                        _this.loadAddressList();
                    },function(errMsg){
                        _mm.errorTips(errMsg);
                    })
                }
            }
            $('.modal').hide();
        })
    },
    renderModal: function(data){
        var modalHtml = _mm.renderHtml(templateModal,data);
        $('.modal').html(modalHtml);
    },
    loadAddressList: function(){
        var _this = this;
        _address.getAddressList(function(res){
            var addressHtml = _mm.renderHtml(templateAddress,res);
            $('.section-address').html(addressHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
        //每次加载地址列表selectedAddressId置为0，地址未选中
        _this.data.selectedAddressId = 0;
    }
}
module.exports = modal;