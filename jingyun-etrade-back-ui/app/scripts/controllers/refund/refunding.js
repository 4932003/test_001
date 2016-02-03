'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('RefundingController', function ($scope, $state, ConstantService, RefundService, GoodsOperationService) {
	/*获取当前的商家*/
    GoodsOperationService.merchantlist().success(function(data){
        $scope.merchantlist =data.body;
    }); 
    $scope.search = function (){
    	RefundService.listWithCondition($scope.mid, 0, 10, "RREQUEST")
    	.success(function(data){
    		$scope.refunds = data.body;
    	});
    };
    $scope.accept = function(refund){
    	var returnGoods = refund.returnGoods;
    	var accepted = false;
    	if(!returnGoods){
    		if(confirm("买家请求只退款不退货，如果同意对方请求，款项需要直接退换用户账户。")){
    			RefundService.accept(refund.id, '')
    				.success(function(data){
    					if(data.ok){
    						alert("您已同意买家的退款申请，请尽快完成款项的退换。");
    						return;
    					}else{
    						alert(data.message);
    						return;
    					}
    				});
    		}else{
    			return;
    		}
    	}else{
    		if(confirm("您确定要同意买家的退款申请吗？请将您的收货地址告诉卖家")){
    			$state.go("trading-center.refunding-accept", {'rid': refund.id});
    			return;
    		}else{
    			return ;
    		}
    	}
    };
});