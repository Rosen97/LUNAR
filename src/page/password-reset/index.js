require('./index.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var page = {
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function(){
		this.loadStepUsername();
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		$('#username-submit').click(function(){
            _this.data.username = $.trim($('#username').val());
            var username = _this.data.username;
			if(username){
				_user.getQuestion(username,function(res){
                    _this.loadStepQuestion(res);
                    _this.data.question = res;
				},function(errMsg){
				    _mm.errorTips(errMsg);	
				})
			}
			else{
				$('.error-item').show().text('用户名不能为空！');
			}
		})
		$('#answer-submit').click(function(){
            _this.data.answer = $.trim($('#answer').val());
            var answer = _this.data.answer;
			if(answer){
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: _this.data.answer
				},function(res){
                    _this.loadStepPassword(res);
                    _this.data.token = res;
                    console.log(res);
				},function(errMsg){
				    _mm.errorTips(errMsg);	
				})
			}
			else{
				$('.error-item').show().text('密码提示问题不能为空！');
			}
		})
		$('#password-submit').click(function(){
			var userInfo = {
				username: _this.data.username,
				passwordNew: $.trim($('#password').val()),
				forgetToken: _this.data.token
			}
			console.log(userInfo.passwordNew);
			// if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(userInfo.passwordNew))){
   //              $('.error-item').show().text('密码长度为6~18位，且包含字母和数字！');
   //          }else{
   //          	$('.error-item').hide();
   //          	_user.updatePassword(userInfo,function(res){
   //          		console.log(res);
   //          	},function(errMsg){
   //          		_mm.errorTips(errMsg);
   //          	})
   //          }
            if(userInfo.passwordNew){
           	    $('.error-item').hide();
        	    _user.resetPassword(userInfo,function(res){
        		    window.location.href = './result.html?type=reset-password';
        	    },function(errMsg){
        	  	    _mm.errorTips(errMsg);
        	    })
            }else{
            	$('.error-item').show().text('密码长度为6~18位，且包含字母和数字！');
            }
		})
	},
	loadStepUsername: function(){
		$('.step-username').show();
	},
	loadStepQuestion: function(data){
		$('.error-item').hide();
		$('.step-username').hide().siblings('.step-question').show()
		                   .find('.question').text(data);
	},
	loadStepPassword: function(data){
		$('.error-item').hide();
		$('.step-question').hide().siblings('.step-password').show()
		                   .find('.question').text(data);
	}
}
$(function(){
	page.init();
})