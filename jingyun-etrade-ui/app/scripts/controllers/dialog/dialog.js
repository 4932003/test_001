'use strict';
/*
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('DialogController', function ($route,$scope,$location, $cookies,  DiscountCouponService, CashCouponService) {

	$scope.closeDialog  =function(id){
		$("#"+id).modal("hide");
	}
});