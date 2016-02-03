'use strict';

shopApp.directive('promotionProduct', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/promotion-product/promotion-product.html'
          
          /*  ,
            scope:{
            	expandlist:'@',
            	getById: "&"
            }*/
        };
    }
]);