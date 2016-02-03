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
      //广告模块列表查询
      .state('station-goods.admodule-list',{
        templateUrl: '/views/track/admodulelist.html',
        url:"/admodule/list"
      })
      //广告列表查询
      .state('station-goods.addetail-list',{
        templateUrl: '/views/track/addetaillist.html',
        url:"/addetail/list"
      })
      //广告模块维护
      .state('station-goods.admodule-edit',{
        templateUrl:'/views/track/admoduleedit.html',
        url:"/admodule/edit?id"
      })
      //广告维护
      .state('station-goods.addetail-edit',{
        templateUrl:'/views/track/addetailedit.html',
        url:"/addetail/edit?id"
      })
      //广告模块新建
      .state('station-goods.admodule-add',{
        templateUrl:'/views/track/admoduleadd.html',
        url:"/admodule/add"
      })
      //广告新建
      .state('station-goods.addetail-add',{
        templateUrl:'/views/track/addetailadd.html',
        url:"/addetail/add"
      })
      ;
  });
