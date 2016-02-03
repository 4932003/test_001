'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('CashCouponUsedController', function ($scope,$location, $cookies,$stateParams, CashCouponService, ConstantService) {

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
	CashCouponService.getConsumedCoupon(uid).success(function(data){
		$scope.coupons = data.body;
	})
	//参数
	var add = $stateParams.add;
	if(add==1){
		$("recharge-voucher-dialog").modal("show");
	}
				
	

});	