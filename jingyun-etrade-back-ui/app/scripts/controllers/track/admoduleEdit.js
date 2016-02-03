'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('AdmoduleEditController', function ($scope,$state,$route,$location,AdmoduleEditService, ApiService) {
	var id = $state.params.id;//获取广告模块ID
	$scope.obj = {
				 id: "",
				 code: "",
				 name:"",
				 imgpath:"", 
				 description:""
	};
	if(id){
		AdmoduleEditService.getAdmoduleInfo(id)
				.success(function(data){
					var r = data.body;
					$scope.obj.id = r.id;
					$scope.obj.code = r.code;
					$scope.obj.name = r.name;
					$scope.obj.imgpath = r.imgpath;
					$scope.obj.description = r.description;
				});
	}else{
		 
	};
	 

	/*保存或者修改*/
	$scope.saveorupdate =function(obj){ 
		if(obj.id){
			AdmoduleEditService.updateAdmodule(obj);
		}else{
			AdmoduleEditService.saveAdmodule(obj);
		}
	};

});