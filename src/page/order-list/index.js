require('./index.css');
require('./index.string');
require('page/common/topbar/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	init: function(){
        this.loadOrderList();
	},
	loadOrderList: function(){
		_order.getOrderList({
			pageNum: 1,
			pageSize: 10
		},function(res){
			console.log(res);
            var orderListHtml = _mm.renderHtml(templateIndex,res);
            $('.order-list').html(orderListHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
	}
}

$(function(){
	page.init();
})
