'use strict';

shopApp.directive('myorderitem', function (){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/views/user-center/trading-center/myorderitem.html'
    };
});