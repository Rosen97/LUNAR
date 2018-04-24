require('./index.css');
require('./index.string');
require('page/common/topbar/index.js');
require('page/common/navside/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var navSide = require('page/common/navside/index.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	init: function(){
		this.onload();
		this.loadOrderList();
	},
	onload: function(){
		navSide.init({
			name: 'order-list'
		})
	},
	loadOrderList: function(){
		_order.getOrderList({
		    pageNum: 1,
		    pageSize: 10
		},function(res){ 
			console.log(res);
			var orderHtml = _mm.renderHtml(templateIndex,res);
			$('.order-con').html(orderHtml);
		},function(errMsg){
		    _mm.errorTips(errMsg);
		})
	}
}
$(function(){
	page.init();
})