'use strict';

shopApp.directive('footer', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/footer/footer.html'
        };
    }
]);

shopApp.directive('findPwFooter', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/footer/find-pw-footer.html'
        };
    }
]);