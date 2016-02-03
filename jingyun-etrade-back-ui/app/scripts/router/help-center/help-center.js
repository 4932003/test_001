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
      .state('station-info.help-center-category', {
        templateUrl: '/views/help-center/category.html',
        url:"/helpcenter/category"
      }).state('station-info.help-center-detail', {
        templateUrl: '/views/help-center/detail.html',
        url:"/helpcenter/detail"
      });
  });
