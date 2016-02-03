'use strict';

function like(jtime,ytime,width) {
	var nowimg = 0;	
	var geshu = $(".user-center-bottom .user-center-b-details>ul>li").length;
	$(".user-center-bottom .user-center-b-details>ul>li").clone().appendTo(".user-center-bottom .user-center-b-details ul");
	$(".user-center-bottom .user-center-b-right").click(dongyici);
	function dongyici(){
		if(!$(".user-center-bottom .user-center-b-details>ul").is(":animated")){
			if(nowimg < geshu - 1){
				nowimg ++ ;
				$(".user-center-bottom .user-center-b-details>ul").animate({"left":-width*nowimg},ytime);
			}else{
				nowimg = 0;
				$(".user-center-bottom .user-center-b-details>ul").animate({"left":-width*geshu},ytime,function(){
					$(this).css("left",0);
				});
			}
		}
	}

	$(" .user-center-bottom .user-center-b-left").click(
		function(){
			if(!$(".user-center-bottom .user-center-b-details>ul").is(":animated")){
				if(nowimg > 0){
					nowimg --;
					$(".user-center-bottom .user-center-b-details>ul").animate({"left":-width * nowimg},ytime);
				}else{
					nowimg = geshu - 1;
					$(".user-center-bottom .user-center-b-details>ul").css("left",-width * geshu);
					$(".user-center-bottom .user-center-b-details>ul").animate({"left":-width * nowimg},ytime);
				}
			}
		}
	);
}

