require('./index.css')
require('page/common/topbar/index.js')
require('page/common/header/index.js')
var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

var page = {
    init: function(){
        this.categoryList();
        this.bannerRun();
        this.countDown();
        this.commoditySlider();
        this.floorSlider();
    },
    // category-content
    categoryList: function(){
        $('.category .category-item').hover(function(){
            $(this).find('.category-content').show();
        },function(){
            $(this).find('.category-content').hide();
        })
    }
    ,
    // category banner
    bannerRun: function(){
    	var oBanner = $('.banner .banner-item'),
    	    oLi = $('.banner .control-item'),
    	    nowIndex=0;//索引值
    	//定时器切换与点击按钮切换略有不同  定时器先切换后改变nowIndex，按钮切换相反
    	function active(){
    		oBanner.eq(nowIndex).addClass('active').siblings().removeClass('active');
    		oLi.eq(nowIndex).addClass('active').siblings().removeClass('active');
    		// console.log(nowIndex);
    	}
    	function move(){
    		active();
    		nowIndex >= oBanner.length-1 ? nowIndex=0 : nowIndex++;
    	}
    	var timer = setInterval(move,2000);
        $('.banner').hover(function(){
        	clearInterval(timer);
        },function(){
        	timer = setInterval(move,2000);
        })
        oLi.click(function(){
        	nowIndex = $(this).index();
        	active();
        })
        $('.category .banner .next').click(function(){
        	nowIndex++;
        	nowIndex > oBanner.length-1 ? nowIndex=0 : nowIndex;
        	active();
        })
        $('.category .banner .prev').click(function(){
        	nowIndex--;
        	nowIndex <0 ? nowIndex=oBanner.length-1 : nowIndex;
        	active();
        })
    },
    // FLSAH DEALS 
    countDown: function(){
        var timer = setInterval(function(){
            var date=new Date();
            var second = date.getSeconds();
            if(second < 10){
                second = '0' + second;
            }
            var nowDate   = new Date("2018/4/15" + " "+date.getHours()+':'+date.getMinutes()+':'+second);
            var finalDate = new Date("2018/4/15 18:00:00");
            //获取时间差值 s数
            var dValue = (finalDate-nowDate)/1000;
            $('.cd-hours').html(Math.floor(dValue/3600));
            $('.cd-minutes').html(Math.floor(dValue%3600/60));
            $('.cd-seconds').html(dValue%3600%60);
        },1000)    
    },
    //commoditySlider
    commoditySlider: function(){
        var minLeft = 0, //初始left值为0  
            maxLeft = $('.slider-list').width(),//获得slider的总宽
            listLeft = Math.ceil($('.slider-list').position().left);
        //滑动效果
        function slide(){
            $('.slider-list').animate({
                left: listLeft + 'px'
            },800)
        }
        //监听函数，获取.banner-btn,判断是否有prev或next，作出相应判断
        //hasClass()和isClass 判断元素是否存在class名
        $(document).on('click','.fdGoods-slider .banner-btn',function(){
            if($(this).is('.prev')){
                if(listLeft<0){
                    listLeft += maxLeft/3;
                    slide();
                    console.log(listLeft);
                }
                return;
            }else{
                if(listLeft>-maxLeft*(2/3)){
                    listLeft -= maxLeft/3;
                    slide();
                    console.log(listLeft);
                }
                return;
            }
        }),

        //fdGoods-tab
        $(document).on('mouseover','.fdGoods-tab .control-item',function(){
            if(!$(this).hasClass('active')){         
                $(this).addClass('active').siblings().removeClass('active');
                $('.fdGoods-tab .ft-item').eq($(this).index()).addClass('active')
                                          .siblings().removeClass('active');
            }
        })
    
    },
    //buyFloor-slider
    floorSlider: function(){
        function change(element,value){
            element.find('.buyFloor-slider').animate({
                bottom: value
            },300)
        }
        $('.buyFloor .bi-show').hover(function(){
            change($(this),0);
        },function(){
            change($(this),'-74px');
        })
    }

}

$(function(){
	page.init();
})
