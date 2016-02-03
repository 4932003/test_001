'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('ActiveCouponController', function ($route,$scope,$location, $cookies,  DiscountCouponService, CashCouponService,Dialog) {

	


	$scope.activeDiscountCoupon = function(code){
		if(code!=null && code!=undefined && code!=''){
			DiscountCouponService.activeDiscountCoupon(code).success(function(data){
						if(data.code==200){
							//alert('充值成功');
							//将更改传给父级controller
                            $scope.$emit("activeDiscountCoupon", '抵用券激活');
                            $scope.code = '';
						}else{
							Dialog.alert($scope, data.message);
						}
					});
		}else{
            Dialog.alert($scope, '请输入卡号');
		}
	};

	$scope.closeDialog = function(){
		$("#illegal-request-dialog").modal("hide");
	}

	
	$scope.activeCashCoupon = function(code){
		if(code!=null && code!=undefined && code!=''){
			CashCouponService.activeCashCoupon(code).success(function(data){
					if(data.code==200){
						//alert('充值成功');
						//将更改传给父级controller
                        $scope.$emit("activeCashCoupon", '购物金激活');
                        $scope.code = '';

					}else{
						Dialog.alert($scope, data.message);
					}
				});
		}else{
            Dialog.alert($scope, '请输入卡号');
		}
		
	};
				
	

});	