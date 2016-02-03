'use strict';

shopApp.directive('recommendProductForYou', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/recommend-product/recommend-product-for-you.html'
        };
    }
]);