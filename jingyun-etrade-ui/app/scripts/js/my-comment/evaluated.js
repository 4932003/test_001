'use strict';
// function evaluated() {
// 	var nowimg = 0;
// $(document).on('click','.gid-right .gid-dot-ul .gid-dli',function(){			
// 			nowimg = $(this).index();
// 			change();
// 		});
// 	function change(){
// 		$(".gid-right .gid-tuul .gid-tuli").eq(nowimg).addClass("cur").siblings().removeClass("cur");
// 		$(".gid-right .gid-dot-ul .gid-dli").eq(nowimg).addClass("cur").siblings().removeClass("cur");
// 		$(".gid-pic-bd").addClass("on");
// 	}
// }




function beginItem(itemName){
		var nowimg = 0;
        var bName ="."+itemName+ " .gid-dli";
        $(document).on('click',bName,function(){
        alert("222"+bName);			
			nowimg = $(this).index();

			change(itemName,nowimg);
		});
        
}

function change(itemName,nowimg){
		$("."+itemName+ " .gid-tuli").eq(nowimg).addClass("cur").siblings().removeClass("cur");
		$("."+itemName+ " .gid-dli").eq(nowimg).addClass("cur").siblings().removeClass("cur");
		$(".gid-pic-bd").addClass("on");
}