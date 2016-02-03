'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 我的优惠券
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('CashCouponUnusedController', function ($scope,$location, $cookies, $stateParams,CashCouponService, ConstantService) {

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);

	CashCouponService.getUnusedCoupon(uid).success(function(data){
		$scope.coupons = data.body;
		if('add'==$stateParams.add){
	    	$("#recharge-shopping-gold-dialog").modal("show");
	    };
	});
	
	




    $scope.$on("activeCashCoupon",
      function (event, msg) {
	      	$("#recharge-shopping-gold-dialog").modal("hide");
	        CashCouponService.getUnusedCoupon(uid).success(function(data){
				$scope.coupons = data.body;
			});
        
      });



				
	

});	