'use strict';

shopApp.directive('refundStep', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/refund/snippet/refund-steps.html'
        };
    }
]).directive('returnStep', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/refund/snippet/return-steps.html'
        };
    }
]).directive('returnRequestSuccessAction', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/refund/snippet/return-request-success-action.html'
        };
    }
]).directive('refundRequestSuccessAction', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/refund/snippet/refund-request-success-action.html'
        };
    }
]).directive('returnLogisticAction', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/refund/snippet/return-logistic.html'
        };
}).directive('returnLogisticSuccessAction', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/refund/snippet/return-logistic-success.html'
        };
}).directive('refundDone', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/refund/snippet/refund-done.html'
        };
}).directive('refundGoods', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/refund/snippet/refund-goods.html'
        };
}).directive('refundDeniedAction', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/refund/snippet/refund-denied.html'
        };
});