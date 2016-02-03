'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 帮助中心
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('HelpCenterController', function ($sce,$state,$route,$scope,$location, $timeout, $cookies,$stateParams, HelpCenterCategoryService, HelpCenterDetailService) {

//类别
	var categoryID = $stateParams.categoryID;
	//详情
	var detailID = $stateParams.detailID;

	//展示分类
	HelpCenterCategoryService.list().success(function(data){
		var go404 = true;
		$scope.categoryList = data.body;
		if($scope.categoryList.length!=0){
			if(!isEmpty(categoryID) ){
					
				for (var i = 0; i < $scope.categoryList.length; i++) {
    					var category = $scope.categoryList[i];
    					if(category.id==categoryID){
							go404  = false;
							//展开
							$timeout(function(){
								openCateger(i);
							}, 500, false); 
			    			return;
			    		}
    			};
    			if(go404){
    				//都没找到跳到404页面
					$state.go('404');
    			};
	        		
			}
			
		}
		
	});
	
			
	

	var openCateger = function(num){
		//展开
		if($("#first-menu-"+num).next().find(".help-center-second-menu-box").css("display") == "none"){
			$("#first-menu-"+num).find(".red-un-dd-icon").css('transform',' rotate(90deg)');
			$("#first-menu-"+num).next().find(".help-center-second-menu-box").slideToggle();
		}
		
	}

	var isEmpty = function(str){
		if(str==''|| str==null || str ==undefined){
			return true;
		};
		return false;
	}



	

	//监听到类别改变 将对应的类别展开
	$scope.$on("helpcenterCatogeryChanged",
      function (event, msg) {
	      	for (var i = 0; i < $scope.categoryList.length; i++) {
				var category = $scope.categoryList[i];
				if(category.id==msg){
					//展开
					$timeout(function(){
						openCateger(i);
					}, 500, false); 
					
	    			return;
	    		}
		};

        
      });


	

});	