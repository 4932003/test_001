'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MyCouponController', function ($scope,$location, $cookies,$state, CashCouponService, DiscountCouponService, ConstantService) {

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);

	$scope.$watch('$viewContentLoaded', function() {  
       countUnusedDiscountCCoupon();
       countUnusedCashCoupon();
    }); 

    

	//可使用的抵用券数量
	var countUnusedDiscountCCoupon = function(){
		DiscountCouponService.getUnusedCouponAmount(uid).success(function(data){
			if(data.code==200){
				$scope.discountCouponAmount = data.body;
			}else{
				$scope.discountCouponAmount = 0;
			}
		});
	}
	



	//可使用的购物金数量
	var countUnusedCashCoupon = function(){
		CashCouponService.getUnusedCouponAmount(uid).success(function(data){
			if(data.code==200){

				$scope.cashCouponAmount = data.body;
			}else{
				$scope.cashCouponAmount = 0;
			}
		})
	}

	$scope.goRechargeVoucher = function(){
		$state.go('user-center.my-voucher.voucher-not-use',{add:'add'});
	};

	$scope.goRechargeShoppingGold = function(){
		$state.go('user-center.my-shopping-gold.gold-not-use',{add:'add'});
	};
	


	



	

});	