require('./index.css');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var _mm   = require('util/mm.js');

var page = {
    init: function(){
        this.loadUserInfo();
        this.loadCartCount();
        this.bindEvent();
        return this;
    },
    //登录  退出登录
    bindEvent: function(){
        //点击登录时不能直接在a标签上添加链接，需要记住原先网页地址，登陆成功后返回之前的页面
        $('#user-login').click(function(){
            _mm.doLogin();
        })
        $('.topbar .logout').click(function(){
            _user.logout(function(res){
                //重新加载页面
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        })
    },
    //初始化用户信息，检查用户是否登录
    loadUserInfo: function(){
        _user.checkLogin(function(res){
            $('.user.login').hide().siblings('.user.not-login').show()
                .find('.topbar-username').text(res.username);
        },function(errMsg){
            $('.user.login').show();
        })
    },
    //初始化加载购物车数量
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            //购物车数量>0,高亮显示
            if(res>0){
               $('.topbar-nav .nav-cart').addClass('active')
                                         .find('.link').addClass('active'); 
            }else{
               $('.topbar-nav .nav-cart').removeClass('active')
                                         .find('.link').removeClass('active');  
            }
            $('.topbar-nav .cart-count').text(res);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    }
}
$(function(){
  page.init();
})