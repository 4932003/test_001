'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MyVoucherController', function ($scope,$location, $cookies, DiscountCouponService, ConstantService) {

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);

	//未使用数量
	DiscountCouponService.getUnusedCouponAmount(uid).success(function(data){
		if(data.code==200){
			$scope.unUsedAmount = data.body;
		}
	})

	//已使用数量
	DiscountCouponService.getConsumedCouponAmount(uid).success(function(data){
		if(data.code==200){
			$scope.usedAmount = data.body;
		}
	})

	//已过期数量
	DiscountCouponService.getOverdueCouponAmount(uid).success(function(data){
		if(data.code==200){
			$scope.overdueAmount = data.body;
		}
	});

	$scope.$on("activeDiscountCoupon",
      function (event, msg) {
	      	$scope.unUsedAmount = $scope.unUsedAmount + 1;
        
      });
	

});	