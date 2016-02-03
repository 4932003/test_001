'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('GoodsadCtrl', function ($scope,$state,$stateParams,GoodsadService,GoodsService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var gid = $stateParams.gid;
    GoodsadService.listHot24Goods().success(function(data){
        $scope.ad24goods = data.body;
    });
    GoodsadService.listHoneyGoods(gid).success(function(data){
        $scope.honeygoods = data.body;
    });
    //查询猜你喜欢 //推荐产品
   GoodsService.recommendlist().get({from:0,size:3},  function(data){
              $scope.recommendlist = data.body;
           }, 
        function(data){
          var rlt = data.message;
          });
  });
