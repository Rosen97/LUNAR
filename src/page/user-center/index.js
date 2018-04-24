require('./index.css');
require('page/common/topbar/index.js');
require('page/common/navside/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/navside/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
var templateModal = require('./modal.string');

var page = {
	init: function(){
        this.onload();  
    },
    onload: function(){
        navSide.init({
            name: 'user-center'
        })
        this.bindEvent();
        this.loadUserInfo();
    },
	bindEvent: function(){
		var _this = this;
		//更改用户信息，表单回填
        $(document).on('click','.user-center-btn',function(){
            $('.modal').show();
            _user.getUserInfo(function(res){
                var modalHtml = _mm.renderHtml(templateModal,res);
	            $('.modal-content').html(modalHtml);
	        },function(errMsg){
	        	_mm.errorTips(errMsg);
	        })
        })
        $(document).on('click','.modal-footer .link',function(){
            var type = $(this).hasClass('save') ? 'save' : 'delete',
                userInfo = {
                    phone: $.trim($('.modal-phone').val()),
                    email: $.trim($('.modal-email').val()),
                    question: $.trim($('.modal-question').val()),
                    answer: $.trim($('.modal-answer').val()),
                };
            if(type === 'save'){
                _user.updateUserInfo(userInfo,function(res){
                    _this.loadUserInfo();
                },function(errMsg){
                	_mm.errorTips(errMsg);
                })
            }
            $('.modal').hide();
        })
	},
	//初始加载用户信息
	loadUserInfo: function(){
        _user.getUserInfo(function(res){
            var userHtml = _mm.renderHtml(templateIndex,res);
            $('.user-center').html(userHtml);
        },function(errMsg){
        	_mm.errorTips(errMsg);
        })
	}
}

$(function(){
	page.init();
})