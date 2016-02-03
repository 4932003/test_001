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
      //商家列表查询
      .state('station-goods.merchant-list',{
        templateUrl: '/views/merchant/merchantlist.html',
        url:"/merchant/list"
      })//商家维护
      .state('station-goods.merchant-edit',{
        templateUrl:'/views/merchant/merchantedit.html',
        url:"/merchant/edit?mid"
      })//商家新建
      .state('station-goods.merchant-add',{
        templateUrl:'/views/merchant/merchantadd.html',
        url:"/merchant/add"
      });
  });
