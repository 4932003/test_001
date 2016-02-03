'use strict';

/**
 * @ngdoc overview
 * @name jingyunetradebackApp
 * @description
 * # jingyunetradebackApp
 *
 * Main module of the application.
 */
shopbackApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      //品牌列表查询
      .state('trading-center.refunding-list',{
        templateUrl: '/views/trading-center/refund-management/refunding.html',
        url:"/refunding"
      })//品牌维护
      .state('trading-center.returning-list',{
        templateUrl:'/views/trading-center/refund-management/returning.html',
        url:"/returning"
      })//品牌新建
      .state('trading-center.refunded-list',{
        templateUrl:'/views/trading-center/refund-management/refunded.html',
        url:"/refunded"
      })
      .state('trading-center.refunding-accept', {
        templateUrl:'/views/trading-center/refund-management/refunding_receiver.html',
        url:"/refunding/accept/:rid"
      })
      .state('trading-center.refunding-deny', {
        templateUrl:'/views/trading-center/refund-management/refunding_deny.html',
        url:"/refunding/deny/:rid"
      });
  });
