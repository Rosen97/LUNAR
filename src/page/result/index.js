require('./index.css');
require('page/common/topbar/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');

$(function(){
	//统一跳转result页，根据param值相应的结果显示
	var type = _mm.getUrlParam('type');
	$('.' + type).show();
})