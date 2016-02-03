'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('AddetailEditController', function ($scope,$state,$route,$location,ApiService,AddetailEditService) {
	var id = $state.params.id;//获取广告ID
	$scope.obj = {
				 id: "",
				 adModuleId: "",
				 name:"",
				 imgpath:"",
				 linkpath:"",
				 description:"",
				 sortNum:"",
				 attr1:"",
				 attr2:"",
				 attr3:"",
				 attr4:""
	};
	if(id){
		AddetailEditService.getAddetailInfo(id)
				.success(function(data){
					var r = data.body;
					$scope.obj.id = r.id;
					$scope.obj.adModuleId = r.adModuleId;
					$scope.obj.name = r.name;
					$scope.obj.imgpath = r.imgpath;
					$scope.obj.linkpath = r.linkpath;
					$scope.obj.description = r.description;
					$scope.obj.sortNum = r.sortNum;
					$scope.obj.attr1 = r.attr1;
					$scope.obj.attr2 = r.attr2;
					$scope.obj.attr3 = r.attr3;
					$scope.obj.attr4 = r.attr4;
				});
	}else{
		 
	};
	
	/*保存或者修改*/
	$scope.saveorupdate =function(obj){ 
		if(obj.id){
			AddetailEditService.updateAddetail(obj);
		}else{
			AddetailEditService.saveAddetail(obj);
		}
	};
	/*获取当前的广告模块*/
	AddetailEditService.admodulelist().success(function(data){
		$scope.admodulelist =data.body;
	}); 
	/*上传图片*/
	$scope.doUpload = function(){
		var form = document.getElementById("fileinfo");  
		var formData = new FormData(form); 
		 var file=document.getElementById("file").files[0];
			if(file!=null){
				 $.ajax({  
						url:ApiService.api.resource.single,
					    type: 'POST',  
						data: formData,
						dataType: 'JSON',
						async: false,  
						cache: false,  
						contentType: false,  
						processData: false,  
						success: function (data) {  
						var data = JSON.stringify(data);
						var body = JSON.parse(data).body;
						$scope.obj.imgpath =  body;
						$scope.success ="上传成功";
					},
					error: function (data) {alert(JSON.stringify(data));}  
					}); 
			}else{
				alert("上传对象为空!");
			}
		};
});