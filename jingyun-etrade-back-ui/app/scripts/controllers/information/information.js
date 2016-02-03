'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('UpdateInfoController', function ($scope,ApiService, UpdateInfoService,$stateParams){
		var id=$stateParams.id;

		UpdateInfoService.getInfobyId(id).success(function(data){
			$scope.infoschool=data.body;
			$scope.thisContent=$scope.infoschool.content;
		});

		$scope.saveuserinfo = function(infoschool){
			infoschool.content=$scope.content;
			UpdateInfoService.updateInfo(infoschool).success(function(data){
				if(data.code==200){
					alert("修改成功");
				};
			});
		};
		//上传文件
	$scope.uploadFile = function(){
		var form = document.getElementById("fileinfo");  

		var fd = new FormData(form); 
		var file=document.getElementById("file");
		var fileName = file.value;

		if(checkImgType(file)){ 
		    $.ajax({  
				url: ApiService.api.resource.single,
			    type: 'POST',  
				data: fd,
				dataType: 'JSON',
				async: false,  
				cache: false,  
				contentType: false,  
				processData: false,  
				success: function (data) {  
					$scope.infoschool.picture = data.body;
					
				},
				error: function (data) {
					alert('上传失败，请稍后重试');
				}  
			}); 
		}else{
			file.value = "";
		};

		

	};
	//文件类型和大小限制
	var  checkImgType = function(img){
 
	   var filepath=$(img).val();
	   var extStart=filepath.lastIndexOf(".");
	   var ext=filepath.substring(extStart,filepath.length).toUpperCase();
	   if(ext!=".PNG"&&ext!=".JPG"){
	  		alert("图片限于jpg,png格式");
	  		return false;
	   };
 
		var file_size = img.files[0].size; 
		var size = file_size/1024; //kb 
		if(size > 200){ 
			alert("上传的文件大小不能超过200kb！"); 
			return false ;
		};
		 
		return true;
				 
	};
	
		
});