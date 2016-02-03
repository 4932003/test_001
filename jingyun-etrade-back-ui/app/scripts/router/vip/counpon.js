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
    	.state('vip',{
	        url:"/vip",
	        views: { 
                  '': {
                      templateUrl: '/views/vip/vip.html'
                      },
                  'vip-left@vip': {
                      templateUrl: 'views/vip/vip-left.html'
                    }
                }
      })
      .state('vip.cashcounpon', {
        templateUrl: '/views/vip/counpon/cashcounpon.html',
        url:"/counpon/cash"
      })
      .state('vip.add-cashcounpon', {
        templateUrl: '/views/vip/counpon/cashcounponAdd.html',
        url:"/counpon/cash/add"
      })
      .state('vip.discountcounpon', {
        templateUrl: '/views/vip/counpon/discountcounpon.html',
        url:"/counpon/discount"
      })
      .state('vip.add-discountcounpon', {
        templateUrl: '/views/vip/counpon/discountcounponAdd.html',
        url:"/counpon/discountcounpon/add"
      });
  });
