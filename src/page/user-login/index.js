require('./index.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//登录账号和密码
// wuyang  zxc131612
var page = {
    init: function(){
    	this.bindEvent();
    },
    bindEvent: function(){
    	//点击登录按钮，键盘回车进行登录
    	var $this = this;
    	$('#submit').click(function(){
    		$this.submit();
    	})
    	$('.user-content').keyup(function(event){
            if(event.keyCode === 13){
            	$this.submit();
            }
    	})
    },
    submit: function(){
    	var formData = {
    		username: $.trim($('#username').val()),
    		password: $.trim($('#password').val())
    	}
    	//字段验证是否为空
    	if(formData.username === '' || formData.password ===''){
            $('.error-item').show().find('.error-msg').text("用户名或者密码不为空");
    	}
    	//字段验证成功后发送post判断账户密码是否正确
    	else{
    		_user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
    		},function(errMsg){
                $('.error-item').show().find('.error-msg').text(errMsg);
    		})
    	}
    }
}

$(function(){
	page.init();
})