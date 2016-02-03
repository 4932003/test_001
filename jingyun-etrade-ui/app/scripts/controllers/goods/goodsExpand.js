'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 * 推广商品 GoodsExpandController
 */
shopApp.controller('GoodsExpandController', function ($scope, $state,$stateParams,GoodsService) {
		//推广商品
		GoodsService.expandlist().success(function(data){
			$scope.expandlist = data.body;
		});

 });