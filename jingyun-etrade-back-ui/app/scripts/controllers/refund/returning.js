'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('ReturningController', function ($scope, $state, ConstantService, RefundService, GoodsOperationService) {
	/*获取当前的商家*/
    GoodsOperationService.merchantlist().success(function(data){
        $scope.merchantlist =data.body;
    }); 
	$scope.search = function (){
    	RefundService.listWithCondition($scope.mid, 0, 10, "RRETURN")
    	.success(function(data){
    		$scope.refunds = data.body;
    	});
    };
    $scope.done = function(refund){
		if(confirm("您确定要同意买家的退货申请？同意后需尽快将款项退换买家。")){
			RefundService.done(refund.id)
				.success(function(data){
					if(data.ok){
						alert("您已同意买家的退货申请，请尽快完成款项的退换。");
						$state.go("trading-center.refunded-list");
						return;
					}else{
						alert(data.message);
						return;
					}
				});
		}else{
			return;
		}
    };
});