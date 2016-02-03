'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('DiscountCouponUnusedController', function ($scope,$location, $cookies,$stateParams, DiscountCouponService, ConstantService) {

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
	
	DiscountCouponService.getUnusedCoupon(uid).success(function(data){
		$scope.coupons = data.body;
		if('add'==$stateParams.add){
    	   $("#recharge-voucher-dialog").modal("show");
    	}
	})

	
	

    $scope.$on("activeDiscountCoupon",
      function (event, msg) {
      	$("#recharge-voucher-dialog").modal("hide");
        DiscountCouponService.getUnusedCoupon(uid).success(function(data){
			$scope.coupons = data.body;
		});
        
      });
				
	

});	