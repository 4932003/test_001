'use strict';
shopApp.directive('banner', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/banner.html'
        };
    }
]);