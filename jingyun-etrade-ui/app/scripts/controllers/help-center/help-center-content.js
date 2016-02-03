'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 帮助中心
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('HelpCenterContentController', function ($sce,$state,$route,$scope,$location, $timeout, $cookies,$stateParams, HelpCenterCategoryService, HelpCenterDetailService) {

//类别
	var categoryID = $stateParams.categoryID;
	//详情
	var detailID = $stateParams.detailID;

	$scope.$watch('$viewContentLoaded', function() { 
		   if(detailID && detailID!=''){
           		getContent(detailID);
           } 
		   else if(categoryID && categoryID!=''){
		   		//类别下的第一个详情
		   		getFirstDetailByCategory(categoryID);
		   }else {
		   		//没找到跳到404页面
				$state.go('404');
		   }
            
            
    });  

    $scope.$on("helpcenterDetailChanged",
      function (event, msg) {
	      	getContent(msg);

        
      });


	//查看页面详情
	var getContent = function(id){
		
		HelpCenterDetailService.single(id).success(function(data){
			if(data.code==200){
				var detail = data.body;
				$scope.detail = data.body;
				$scope.detail.content = $sce.trustAsHtml($scope.detail.content);
				//将更改传给父级controller
                $scope.$emit("helpcenterCatogeryChanged", detail.parentID);
			}else{
				//没找到跳到404页面
				$state.go('404');
			}
			
		});
		
		
	};	

	var getFirstDetailByCategory = function(categoryID){
		HelpCenterDetailService.getFirstDetailByCategory(categoryID).success(function(data){
			if(data.code==200){
				var detail = data.body;
				$scope.detail = data.body;
				$scope.detail.content = $sce.trustAsHtml($scope.detail.content);
				//将更改传给父级controller
                $scope.$emit("helpcenterCatogeryChanged", detail.parentID);
			}else{
				//没找到跳到404页面
				$state.go('404');
			}
			
		});
	}


	

});	