require('./index.css');
require('page/common/topbar/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/navside/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
   init: function(){
   	   this.bindEvent();
       this.onload();
   },
   onload: function(){
    //初始化navSide
       navSide.init({
            name: 'password-update'
        })
   },
   bindEvent: function(){
       var _this = this;
       $('.password-ok').click(function(){
       	   var userInfo = {
       	   	   passwordOld: $.trim($('#password-old').val()),
       	   	   passwordNew: $.trim($('#password-new').val()),
       	   	   passwordConfirm: $.trim($('#password-confirm').val())
       	   }
       	   _user.updatePassword({
               passwordOld: userInfo.passwordOld,
               passwordNew: userInfo.passwordNew,
       	   },function(res){
       	   	   window.location.href = './user-login.html';
       	   },function(errMsg){
       	   	   _mm.errorTips(errMsg);
       	   })
       })
   }
}

$(function(){
	page.init();
})