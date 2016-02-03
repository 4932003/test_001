'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('RefundedController', function ($scope, ConstantService, RefundService, GoodsOperationService) {
	/*获取当前的商家*/
    GoodsOperationService.merchantlist().success(function(data){
        $scope.merchantlist =data.body;
    }); 
	$scope.search = function (){
    	RefundService.listWithCondition($scope.mid, 0, 10, "RDONE")
    	.success(function(data){
    		$scope.refunds = data.body;
    	});
    };
});