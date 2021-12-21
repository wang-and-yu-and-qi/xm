
function mag(show, bigshow,smallshow,mask,bigitem) {
    this.show = show;
    this.bigshow = bigshow;
    this.smallshow = smallshow;
    this.mask = mask;
    this.bigitem = bigitem;
    this.obj = {
        
        middle: '.middle',
        middleBox: '.middle_box'
    }
}
mag.prototype = {
    init() {
        var that = this;
        that.start();
        this.showHover();
        this.smallImgHover();
        this.showMove();
      
    },
    start(){
        var that = this;
        var buil=$(that.show).width()/$(that.mask).width()*$(that.bigshow).width();
        $(that.bigitem).css("width",buil);

        $(that.smallshow + ' img').eq(0).css("border","2px solid #f40");

        var midhei=$(that.obj.middle + ' li').innerWidth()*$(that.obj.middle + ' li').length;
        $(that.obj.middle).width(midhei);

    },
    showHover() {
        var that = this;
        $(that.show).hover(function(){
            $(that.bigshow).show();
            $(that.mask).show();
        },function(){
            $(that.bigshow).hide();
            $(that.mask).hide();
        });
    },
    smallImgHover() {
        var that = this;
        $(that.smallshow + ' img').click(function(){
            var src=$(this).attr("src");
            $(that.smallshow + ' img').css("border","1px solid #e8e8e8");
            $(this).css("border","2px solid #f40");
            $(that.show + '>img').attr("src",src);
            $(that.bigitem+ '>img').attr("src",src);
        });
    },
    showMove(){
        var that = this;
        $(that.show).mousemove(function(e){
            var bigx=$(this).offset().left;
            var bigy=$(this).offset().top;
            var x= e.clientX;
            var y= e.clientY;
            var scrollx=$(window).scrollLeft();
            var scrolly=$(window).scrollTop();
            var ox=x+scrollx-bigx-$(that.mask).width()/2;
            var oy=y+scrolly-bigy-$(that.mask).height()/2;
            if(ox<=0){
                ox=0
            }
            if(ox>$(that.show).width()-$(that.mask).width()){
                ox=$(that.show).width()-$(that.mask).width();
            }
            if(oy<=0){
                oy=0
            }
            if(oy>$(that.show).height()-$(that.mask).height()){
                oy=$(that.show).height()-$(that.mask).height();
            }
            $(that.mask).css({left:ox});
            $(that.mask).css({top:oy});
            var bei=$(that.show).width()/$(that.mask).width();
            $(that.bigitem+ '>img').css(
                { marginLeft:-bei*ox,
                    marginTop:-bei*oy
                })
        });
    },
    

}




