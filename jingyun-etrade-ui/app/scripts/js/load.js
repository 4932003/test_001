'use strict';

$(function(){
    /*main start*/
    breath(500,3000);
    /*main end*/
    /*product-detail start*/
     gallery();
    /*product-detail end*/
    /*my-comment start*/
    /*evaluated();*/
    /*my-comment end*/
   

    /*mall js start*/  
    // addActiveStyle('li.mall-st-name','active');
    // mallSelectedAction('brand','品牌');
    // mallSelectedAction('type','类别');
    // mallSelectedAction('price','价格');
    // removeXDiv('mall-selected-item');
   addActiveStyle('li.mall-sort-item','active');

   addActiveStyle('.search-type-item','search-type-item-selected');
   addActiveStyle('.main-block-title-txt','main-block-tt-active');
   
    /*mall js end*/

    /*help-center left menu start*/
    leftMenu();
    /*help-center left menu end*/
   /* changePage();*/

    /*beginItem('goods-info-box1');*/
   /* beginItem('goods-info-box2');
    beginItem('goods-info-box3');*/


    startItem('.fe-description');
    startItem('.fe-seller-service');
    startItem('.fe-logistics-service');

    returnTop();
})