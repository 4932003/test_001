'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MyAccountController'
	, function ($scope,$location, $cookies, MyAccountService, UserService,MyMessageService,OrderService, ConstantService,SafetySettingService,CashCouponService,DiscountCouponService,PointService) {

	//用户信息
	UserService.getLoginUser().success(function(data){
		if(data.code==200){
			var user = data.body;

			$scope.user = user;
			$scope.user.viewMobile = UserService.getViewMobile(user.mobile);
			$scope.user.viewEmail = UserService.getViewEmail(user.email);
		}
	})

	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
	//未读站内信数量
	MyMessageService.getUnReadAmount(uid).success(function(data){
		if(data.code==200){
			$scope.messageAmount = data.body; 
		}
	})

	//账户安全等级
	SafetySettingService.getSafetyLevelObj(uid, $scope);

	//积分
	PointService.get(uid).success(function(data){
		$scope.point = data.body;
	});


	//优惠券数量
	MyAccountService.getUnusedCouponAmount(uid).success(function(data){
		$scope.couponAmount = data.body; 
	})


	


	
})