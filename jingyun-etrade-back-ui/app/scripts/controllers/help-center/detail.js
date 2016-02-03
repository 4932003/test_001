'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('HelpCenterDetailController', function ($scope,$cookies, ConstantService, HelpCenterCategoryService,HelpCenterDetailService) {

	 $scope.$watch('$viewContentLoaded', function() {  
       listCategory();
        
    });  
	var ue = UE.getEditor("editor");
	$scope.detail = {};
	 //展示分类
	var listCategory = function(){
		HelpCenterCategoryService.list().success(function(data){
			$scope.categoryList = data.body;
		});
	};
	//刷新分类的子菜单
	var refreshCategory = function(categoryID){
		if(!isEmpty($scope.categoryList)){
			for (var i = 0; i < $scope.categoryList.length; i++) {
				if($scope.categoryList[i].id == categoryID){
					$scope.listDetail($scope.categoryList[i]);
					return;
				}
			}
		}
	};
	//根据分类查询列表
	$scope.listDetail = function(category){
		
		$scope.detail = {'parentID':category.id, 'parentName':category.name};
		$scope.title = '新增';
		$scope.thisContent = '';
	};

	$scope.title = '新增';

	$scope.getSingle = function(id){

		HelpCenterDetailService.single(id).success(function(data){
			$scope.detail = data.body;
			$scope.detail.parentName = getCategoryByID($scope.detail.parentID).name;
			$scope.title = '修改';
			$scope.thisContent = (data.body.content);

			 
			 ue.setContent($scope.thisContent );
		});
	};

	var getCategoryByID = function(id){
		for (var i = 0; i < $scope.categoryList.length; i++) {
			if($scope.categoryList[i].id == id){
				return $scope.categoryList[i];
			};
		};
		return null;
	}

	$scope.newDetail = function(){
		if(isEmpty($scope.detail) || isEmpty($scope.detail.parentID)){
			alert("请选择左侧类别");
			return;
		}
		$scope.detail = {'parentID':$scope.detail.parentID, 'parentName':$scope.detail.parentName};
		$scope.title = '新增';
		$scope.thisContent = '';
		ue.setContent($scope.thisContent );
	};

	

	$scope.submitItem = function(detail, ifValid){
		//校验通过
		if(ifValid){
			//已选择分类
			if(!isEmpty(detail.parentID)){
				var content = $scope.content;
				if(!isEmpty(content)){
					detail.content = content;
					if(!isEmpty(detail.id)){
						HelpCenterDetailService.refresh(detail).success(function(data){
							if(data.code==200){
								alert('修改成功');
								$scope.newDetail();
								refreshCategory(detail.parentID);
							}else{
								alert(data.message);
							}
						});

					}else{
						HelpCenterDetailService.save(detail).success(function(data){
							if(data.code==200){
								alert('保存成功');
								$scope.newDetail();
								refreshCategory(detail.parentID);
							}else{
								alert(data.message);
							}
						});
					}
				}else{
					alert("请输入页面内容");
				}
					
			}else{
				alert('请选择分类');
			}
		}
	};

	$scope.remove = function(id, category){
		if(confirm("确定删除吗")){
			HelpCenterDetailService.remove(id).success(function(data){
				if(data.code==200){
					alert("删除成功");
					refreshCategory(category.id);
				}
			});
		}
	};

	var isEmpty = function(str){
		if(str==undefined || str==null || str==''){
			return true;
		}
		return false;
	};

	$scope.showOrHideList = function(category){
		category.showDetail = !category.showDetail;
	};
});