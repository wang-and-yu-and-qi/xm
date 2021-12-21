$(document).ready(// 轮播图
    (function(){
    
        var i=0;
        var timer=null;
        for (var j = 0; j < $('.banner .swiper-wrapper div').length; j++) { //创建圆点
        $('.banner .swiper-pagination').append('<li><a href=""></a></li>')
        }
        $('.banner .swiper-pagination li').first().addClass('active'); //给第一个圆点添加样式
        
        var firstimg=$('.banner .swiper-wrapper div').first().clone(); //复制第一张图片
        // console.log(firstimg);
        $('.banner .swiper-wrapper').append(firstimg).width($('.banner .swiper-wrapper div').length*($('.banner .swiper-wrapper img').width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度
        
        
        
        //鼠标点击圆点
        $('.banner .swiper-pagination li').click(function(){
        var _index=$(this).index();
        $('.banner .swiper-wrapper').stop().animate({left:-_index*1920},150);
        $('.banner .swiper-pagination li').eq(_index).addClass('active').siblings().removeClass('active');
        })
        
        //定时器自动播放
        timer=setInterval(function(){
        i++;
        if (i==$('.banner .swiper-wrapper div').length) {
        i=1;
        $('.banner .swiper-wrapper').css({left:0});
        };
        
        $('.banner .swiper-wrapper').stop().animate({left:-i*1920},300);
        if (i==$('.banner .swiper-wrapper div').length-1) { 
        $('.banner .swiper-pagination li').eq(0).addClass('active').siblings().removeClass('active');
        }else{
        $('.banner .swiper-pagination li').eq(i).addClass('active').siblings().removeClass('active');
        }
        },3000)
        
        //鼠标移入，暂停自动播放，移出，开始自动播放
        $('.banner').hover(function(){ 
        clearInterval(timer);
        },function(){
        timer=setInterval(function(){
        i++;
        if (i==$('.banner .swiper-wrapper div').length) {
        i=1;
        $('.banner .swiper-wrapper').css({left:0});
        };
        
        $('.banner .swiper-wrapper').stop().animate({left:-i*1920},300);
        if (i==$('.banner .swiper-wrapper div').length-1) { 
        $('.banner .swiper-pagination li').eq(0).addClass('active').siblings().removeClass('active');
        }else{
        $('.banner .swiper-pagination li').eq(i).addClass('active').siblings().removeClass('active');
        }
        },3000)
        })
        
        }))