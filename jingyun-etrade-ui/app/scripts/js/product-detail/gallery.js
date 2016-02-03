'use strict';
function gallery(){
	var nowimg = 0; 
	$(document).on('click', '.pd-gallery .pd-g-thumb li.pd-g-dot', function(){
			nowimg = $(this).index();
			change();
	});


	function change(){
		$(".pd-gallery .pd-g-tuul li.pd-tuli").eq(nowimg).addClass("cur").siblings().removeClass("cur");
		$(".pd-gallery .pd-g-thumb li.pd-g-dot").eq(nowimg).addClass("cur").siblings().removeClass("cur");
	}
}