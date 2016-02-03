'use strict';

shopbackApp.directive('footer', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/footer/footer.html'
        };
    }
]);