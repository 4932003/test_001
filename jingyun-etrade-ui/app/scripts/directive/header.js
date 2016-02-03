'use strict';

shopApp.directive('headerTop', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/header/header-top.html'
        };
    }
]);

shopApp.directive('headerSearch', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/header/header-search.html'
        };
    }
]);

shopApp.directive('headerNav', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/header/header-nav.html'
        };
    }
]);

shopApp.directive('findPwHeader', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/header/find-pw-header.html'
        };
    }
]);
