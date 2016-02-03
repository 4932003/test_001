'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('CashcounponAddController', function ($scope,$cookies, ConstantService,CashcounponService) {

	 
	 $scope.submit = function(counpon){
	 	$scope.submiting = true;
	 	CashcounponService.save(counpon, counpon.amount)
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