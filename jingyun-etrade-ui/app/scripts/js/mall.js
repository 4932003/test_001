'use strict';

 function addActiveStyle(itemName,styleName){
 	$(document).on('click', itemName, function(){
 		$(this).addClass(styleName).siblings().removeClass(styleName);
 	});
 }

// function mallSelectedAction(itemName,itemText){
// 	$(document).on('click', '.mall-st-'+itemName+' li.mall-st-name', function(){
// 		var value=$(this).text();
		
// 		$('.mall-selected-'+itemName).html(itemText+'：'+value+'<div class="icon-btn-x fr">x</div>');
// 		$('.mall-selected-'+itemName).css('display','block');
// 	});

// 	$(document).on('click', '.mall-selected-'+itemName+' .icon-btn-x', function(){
// 		$('.mall-st-'+itemName+' li.mall-st-name').removeClass('active');
// 	});
// }

// function removeXDiv(divName){
// 	$(document).on('click', '.'+divName+' .icon-btn-x', function(){
// 		$(this).parent().css('display','none');
// 	});

// }