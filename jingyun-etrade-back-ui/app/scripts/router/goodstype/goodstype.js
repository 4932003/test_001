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
      //类别列表查询
      .state('station-goods.type-list',{
        templateUrl: '/views/goodstype/typelist.html',
        url:"/goodstype/list"
      })//类别维护
      .state('station-goods.type-edit',{
        templateUrl:'/views/goodstype/typeedit.html',
        url:"/goodstype/edit?tid"
      })//类别新建
      .state('station-goods.type-add',{
        templateUrl:'/views/goodstype/typeadd.html',
        url:"/goodstype/add"
      });
  });
