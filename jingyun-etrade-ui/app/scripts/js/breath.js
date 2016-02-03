'use strict';
function breath(ytime,jtime) {
	var nowimg = 0;
	var A=$(window).width();

	$(".breath .tuul li.main-li").css("width",A);
	$(window).resize(
			function(){
				 A=$(window).width();
				 $(".breath .tuul li.main-li").css("width",A);
			}
	);

	//============定时器一堆=================
	 var timer = setInterval(buttask,jtime);
		 $(document).on('mouseenter','.breath',function(){
		 	clearInterval(timer);
		 });
		 $(document).on('mouseleave','.breath',function(){
		 		clearInterval(timer);	
	 		timer = setInterval(buttask,jtime);
		 });
	//============定时器一堆=================
	$(document).on('click','.breath .but .rightbut',function(){
		if(!$(".breath .tuul li.main-li").is(":animated")){
			$(".breath .tuul li.main-li").eq(nowimg).fadeOut(ytime);
			if(nowimg < $(".breath .tuul li.main-li").length - 1){
				nowimg = nowimg + 1;
			}else{
				nowimg = 0;
			}
			$(".breath .tuul li.main-li").eq(nowimg).fadeIn(ytime);
		}
	});
	
	function buttask(){
		if(!$(".breath .tuul li.main-li").is(":animated")){
			$(".breath .tuul li.main-li").eq(nowimg).fadeOut(ytime);
			if(nowimg < $(".breath .tuul li.main-li").length - 1){
				nowimg = nowimg + 1;
			}else{
				nowimg = 0;
			}
			$(".breath .tuul li.main-li").eq(nowimg).fadeIn(ytime);
		}
	}
	$(document).on('click','.breath .but .leftbut',function(){
		if(!$(".breath .tuul li.main-li").is(":animated")){
				$(".breath .tuul li.main-li").eq(nowimg).fadeOut(ytime);
				if(nowimg > 0){
					nowimg = nowimg - 1;
				}else{
					nowimg = $(".breath .tuul li.main-li").length - 1;
				}
				$(".breath .tuul li.main-li").eq(nowimg).fadeIn(ytime);
			}
	});
}