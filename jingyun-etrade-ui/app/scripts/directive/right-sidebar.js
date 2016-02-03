'use strict';

shopApp.directive('rightSidebar', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/right-sidebar.html'
        };
    }
]);