'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 帮助中心
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('FooterController', function ($route,$scope,$location,$timeout, $cookies,$stateParams, HelpCenterCategoryService,Dialog) {

	
	//展示分类
	/*HelpCenterCategoryService.listPage(0, 5).success(function(data){

		$scope.categoryList = data.body;
		
		
	});*/
	
	$scope.dialogAlert=function(info){
		Dialog.alert($scope, info);
	};


});	