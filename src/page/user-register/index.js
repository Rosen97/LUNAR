'use strict';
require('./index.css');
var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

//用来记录输入框的状态
var arr = [false,false,false,false];
var formError = {
    show: function(index,errMsg){
        $('.user-item').eq(index).addClass('active');
        $('.error-item').eq(index).show().find('.error-msg').text(errMsg);
        arr[index]=false;
    },
    hide: function(index){
        $('.user-item').eq(index).removeClass('active');
        $('.error-item').eq(index).hide();
        arr[index]=true;
    }
}
//获取输入框内值
var formData = {
    username: $.trim($('#username').val()),
    password: $.trim($('#password').val()),
    phone: $.trim($('#phone').val())
}
var page = {
    init: function(){
        this.bindEvent();
        this.createCode();
    },
    //制作验证码
    createCode: function(){
        var code = "",   
            codeLength = 4,//验证码的长度   
            checkCode = document.getElementById("code"),    
            random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
         'S','T','U','V','W','X','Y','Z');//随机数   
        for(var i = 0; i < codeLength; i++) {//循环操作   
            var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
            code += random[index];//根据索引取得随机数加到code上   
        }   
        checkCode.value = code;//把code值赋给验证码  
    },
    bindEvent: function(){
        var _this = this;
        //点击切换验证码
        $('#code').click(function(){
            _this.createCode();
        })
        //字段验证 通过hasClass()用户离开了哪个输入框 类似事件监听
        $('.user-con .user-item .user-content').blur(function(){
            //在每次输入框清空后，隐藏错误信息
            //parent(),parsents(),children(),next(),siblings(),find()......
            if(!$.trim($(this).val())){
                $(this).parent('.user-item').removeClass('active')
                                            .next('.error-item').hide();
                return;
            }
            if($(this).hasClass('username')){
                formData.username = $.trim($(this).val());
                //验证用户名是否存在
                _user.checkUsername(formData.username,function(res){
                    formError.hide(0);
                },function(errMsg){
                    formError.show(0,errMsg);
                })
            }
            if($(this).hasClass('password')){
                formData.password = $.trim($(this).val());
                if(formData.password.length<6 || formData.password.length>18){
                    formError.show(1,"密码长度需是8~16个字符！");
                }
                else if(!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(formData.password)){
                    formError.show(1,"密码需包含字母和数字！");
                }
                else{
                    formError.hide(1);
                }
            }
            if($(this).hasClass('phone')){
                formData.phone = $.trim($(this).val());
                if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(formData.phone)){
                    formError.show(2,"请输入正确的手机号！");
                }else{
                    formError.hide(2);
                }
            }
            if($(this).hasClass('confirm-code')){
                //将验证框里的验证码转化为大写 toUpperCase() toLowerCase()
                var confirmCode = $.trim($(this).val()).toUpperCase();
                var code = $('#code').val();
                if(confirmCode !== code){
                    formError.show(3,"验证码错误！");
                } else{
                    formError.hide(3);
                }
            }
        })

        //提交表单 按钮
        $('.user-con .btn-submit').click(function(){
            _this.submit();
        })
    },
    submit: function(){
        if(formData.username === '' || formData.password === '' || 
            formData.phone === '' || $.trim($('.confirm-code').val()) === ''){
            alert('输入框内值不得为空');
        }else{
            //当输入框全部返回true时，注册成功
            if(arr[0] && arr[1] && arr[2] && arr[3]){
                console.log(formData);
                _user.register(formData, function(res){
                    alert("注册成功！");
                    window.location.href = './index.html';
                }, function(errMsg){
                    alert(errMsg);
                });
            }else{
                return;
            }
        }
    }
}
$(function(){
    page.init();
})

