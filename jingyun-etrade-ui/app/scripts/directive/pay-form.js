'use strict';

shopApp.directive('payform', function (){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/views/pay/pay-form.html'
    };
});