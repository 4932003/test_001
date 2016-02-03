'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('HelpCenterCategoryController', function ($scope,$cookies, ConstantService, HelpCenterCategoryService) {

	 $scope.$watch('$viewContentLoaded', function() {  
       list();
        
    });  

	var list = function(){
		HelpCenterCategoryService.list().success(function(data){
			$scope.list = data.body;
		});
	};

	$scope.title = '新增';

	$scope.getSingle = function(item){

		HelpCenterCategoryService.single(item.id).success(function(data){
			$scope.category = data.body;
			$scope.title = '修改';
		});
		
	};

	$scope.newCategory = function(){
		$scope.category = {};
		$scope.title = '新增';
	};

	$scope.submitItem = function(category, ifValid){
		if(ifValid){
			if(category.id!=null && category.id!=undefined){
				HelpCenterCategoryService.refresh(category).success(function(data){
					if(data.code==200){
						alert('修改成功');
						list();
						$scope.newCategory();
					}else{
						alert(data.message);
					}
				});
			}else{
				HelpCenterCategoryService.save(category).success(function(data){
					if(data.code==200){
						alert('保存成功');
						list();
						$scope.newCategory();
					}else{
						alert(data.message);
					}
				});
			}
		}
	};

	$scope.remove = function(id){
		if(confirm("确定删除吗")){
			HelpCenterCategoryService.remove(id).success(function(data){
				if(data.code==200){
					alert("删除成功");
					list();
				}
			});
		};
	};
});