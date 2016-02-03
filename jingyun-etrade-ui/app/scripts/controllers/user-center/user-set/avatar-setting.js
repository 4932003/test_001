'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 根据注册邮箱 验证手机
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('AvatarSettingController', function ($scope,$location, AvatarSettingService, UserinfoService, ApiService,Dialog) {

	UserinfoService.getUserinfo().success(function(data){
		if(data.code==200){
			$scope.userinfo = data.body;
		}
	});

	

	//保存
	$scope.save = function(){
		if($scope.userinfo.picture!=null && $scope.userinfo.picture!=''){
			var info = {
						'uid':$scope.userinfo.uid,
						'picture' : $scope.userinfo.picture
				}

			UserinfoService.saveUserinfo($scope.userinfo)
			.success(function(response){
                if(response.code==200){
                   Dialog.success($scope, "个人图片保存成功");
                }else{
                   Dialog.alert($scope, response.message);
                };
            });
		}
	};

	//上传文件
	$scope.uploadFile = function(){
		var form = document.getElementById("fileinfo");  

		var fd = new FormData(form); 
		var file=document.getElementById("file");
		var fileName = file.value;

		if(checkImgType(file)){ 
		    $.ajax({  
				url: ApiService.api.upload.single,
			    type: 'POST',  
				data: fd,
				dataType: 'JSON',
				async: false,  
				cache: false,  
				contentType: false,  
				processData: false,  
				success: function (data) {  
					$scope.userinfo.picture = data.body;
					
				},
				error: function (data) {
            		Dialog.alert($scope, '上传失败，请稍后重试');
				}  
			}); 
		}else{
			file.value = "";
		}

	};

	//文件类型和大小限制
	var  checkImgType = function(img){
 
	   var filepath=$(img).val();
	   var extStart=filepath.lastIndexOf(".");
	   var ext=filepath.substring(extStart,filepath.length).toUpperCase();
	   if(ext!=".PNG"&&ext!=".JPG"){
            Dialog.alert($scope, '图片限于jpg,png格式');
	  		return false;
	   }
 
		var file_size = img.files[0].size; 
		var size = file_size/1024; //kb 
		if(size > 200){ 
            Dialog.alert($scope, '上传的文件大小不能超过200kb！');
			return false ;
		}
		 
		return true;
				 
	};

});	