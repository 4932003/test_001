'use strict';
/**
*路由定义
*/
shopApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
	$stateProvider.state('refund-detail',{
            templateUrl:'/views/refund/refund-detail.html',
            url:'/refund/detail?rid&ogid'
        }).state('refund-request',{
          url:'/refund/request?oid&mid&ogid&rid',
          templateUrl: '/views/refund/refund-request.html'
        }).state('return-request',{
          url:'/return/request?oid&mid&ogid&rid',
          templateUrl: '/views/refund/return-request.html'
        }).state('refund-goods-buyer-handle',{
          url:'/return/logistic',
          templateUrl: '/views/refund/refund-goods-buyer-handle.html'
        }).state('refund-in-progress', {
          url:'/refund/progress?oid&mid&ogid&rid',
          templateUrl: '/views/refund/refund-progress.html'
        });
});