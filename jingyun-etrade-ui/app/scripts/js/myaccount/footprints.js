'use strict';

function footprints(jtime,ytime,width) {
	var nowimg = 0;	
	var geshu = $(".myaccount-my-footprints .myaccount-slider-img>ul>li").length;
	$(".myaccount-my-footprints .myaccount-slider-img>ul>li").clone().appendTo(".myaccount-my-footprints .myaccount-slider-img ul");
	$(".myaccount-my-footprints .myaccount-slider-right").click(dongyici);
	function dongyici(){
		if(!$(".myaccount-my-footprints .myaccount-slider-img>ul").is(":animated")){
			if(nowimg < geshu - 1){
				nowimg ++ ;
				$(".myaccount-my-footprints .myaccount-slider-img>ul").animate({"left":-width*nowimg},ytime);
			}else{
				nowimg = 0;
				$(".myaccount-my-footprints .myaccount-slider-img>ul").animate({"left":-width*geshu},ytime,function(){
					$(this).css("left",0);
				});
			}
		}
	}

	$(" .myaccount-my-footprints .myaccount-slider-left").click(
		function(){
			if(!$(".myaccount-my-footprints .myaccount-slider-img>ul").is(":animated")){
				if(nowimg > 0){
					nowimg --;
					$(".myaccount-my-footprints .myaccount-slider-img>ul").animate({"left":-width * nowimg},ytime);
				}else{
					nowimg = geshu - 1;
					$(".myaccount-my-footprints .myaccount-slider-img>ul").css("left",-width * geshu);
					$(".myaccount-my-footprints .myaccount-slider-img>ul").animate({"left":-width * nowimg},ytime);
				}
			}
		}
	);
}

