'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('DiscountcounponAddController', function ($scope,$cookies, ConstantService, DiscountcounponService) {

	 $scope.submit = function(counpon){
	 	$scope.submiting = true;

	 	counpon.start =  $("#pro_start").val();
		counpon.end =  $("#pro_end").val();

	 	DiscountcounponService.save(counpon, counpon.amount)
	 		.success(function(data){
		 		$scope.submiting = false;
		 		if(data.code==200){
		 			alert("成功");
		 		}else{
		 			alert(data.message);
		 		}
		 	})
		 	.error(function(data){
		 		$scope.submiting = false;
	 			alert("网络异常,请稍后重试");
		 	});
	 };
	
});