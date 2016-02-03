'use strict';

shopApp.directive('guessLike', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/guess-like/guess-like.html'
        };
    }
]);