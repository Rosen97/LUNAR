require('./index.css');
var _mm = require('util/mm.js');

var page = {
	init: function(){
        this.bindEvent();
        this.onload();
	},
	//页面加载时判断url地址里是否含有keyword值，如果有，回填输入框
	onload: function(){
		var keyword = _mm.getUrlParam('keyword');//获得url中keyword值
		if(keyword){
			$('.header .search-content').val(keyword);
		}
	},
	bindEvent: function(){
		//点击搜索按钮或回车提交input
		var _this = this;
		$('#search-button').click(function(){
			_this.submit();
		})
		$('.header .search-content').keyup(function(event){
			if(event.keyCode === 13){
				_this.submit();
			}
		})
		//搜索框聚焦，离开
		$('.header .search-content').focus(function(){
            $(this).addClass('active').siblings('.search-hot').show()
                   .parent().addClass('active');
		})
		$('.header .search-content').blur(function(){
            $(this).removeClass('active').siblings('.search-hot').hide()
                   .parent().removeClass('active');
		})

	},
	submit: function(){
		var keyword = $.trim($('.header .search-content').val());
		//keyword有值，跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			return;
		}
	}

}

$(function(){
	page.init();
})