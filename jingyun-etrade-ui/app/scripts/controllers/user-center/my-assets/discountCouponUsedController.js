'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('DiscountCouponUsedController', function ($scope,$location, $cookies, DiscountCouponService, ConstantService) {

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
	DiscountCouponService.getConsumedCoupon(uid).success(function(data){
		$scope.coupons = data.body;
	})
				
	

});	