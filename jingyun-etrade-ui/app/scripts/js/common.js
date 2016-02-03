'use strict';

function changeTab(idStr,idNo,idCount,activeStyle){
    var displayTab=idStr+idNo;
    $('#'+displayTab+'-detail').css('display','block');
    $('#'+displayTab+'-hd').addClass(activeStyle);
   
    for(var i=1;i<=idCount;i++){
      if(i!=idNo){
      	    $('#'+idStr+i+'-detail').css('display','none');
      	    $('#'+idStr+i+'-hd').removeClass(activeStyle);
      }
    }
}

/*help-center left menu js START*/
function leftMenu(){
	$(document).on('click', '.help-center-first-menu', function(){
		if($(this).next().find(".help-center-second-menu-box").css("display") == "none"){
			$(this).find(".red-un-dd-icon").css('transform',' rotate(90deg)');
      $(this).parent().siblings().find(".red-un-dd-icon").css('transform',' rotate(0deg)');
      $(this).parent().siblings().find(".help-center-second-menu-box").css("display","none"); 
		}else{
			$(this).find(".red-un-dd-icon").css('transform','rotate(0deg)');
		}

		$(this).next().find(".help-center-second-menu-box").slideToggle();

    });
}

/*END help-center left menu js*/

/*return top js START*/
function returnTop(){
  var min_height = 200;
  $(document).on('click', '.return-top', function(){
        $('html,body').animate({scrollTop:0},300);
        $(this).css("display","none");
  });

  $(window).scroll(function(){
    var s = $(window).scrollTop();
    if( s > min_height){ 
      $(".return-top").fadeIn(100);
    }else{ 
      $(".return-top").fadeOut(200); 
    };
  });

}

/*END return top js*/