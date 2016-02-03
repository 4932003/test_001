'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('Track404Ctrl', function ($scope,$state,$stateParams,TrackService,GoodsService,Dialog) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     //404页面查询推荐
   TrackService.recommendGoodslist().get({pfrom:0,pcount:12}, function(data){
              $scope.recommendGoodslist = data.body;
           }, 
        function(data){
          var rlt = data.message;
          });
  });
