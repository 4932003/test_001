'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('MerchantListController', function ($scope,$routeParams,$route,$location,MerchantListService) {
	$scope.name = '';
	//默认查询商家
	MerchantListService.queryMerchantList('',0,100)
				.success(function(data){
					$scope.merchantlist = data.body;
				});
    //搜索查询商家
    $scope.serch = function(){
    	 MerchantListService.queryMerchantList($scope.name,0,100)
				.success(function(data){
					$scope.merchantlist = data.body;
				});
    };
      
});