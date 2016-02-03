'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('PasswordController', function ($scope,$cookies, ConstantService,PasswordService) {

	

	var getSubmitInfo = function(oldPwd, newPwd){
		return {
			'oldPwd':md5(oldPwd),
			'newPwd':md5(newPwd)
		};
	}

	$scope.submit = function(){
		PasswordService.refreshPwd(getSubmitInfo($scope.oldPwd, $scope.newPwd)).success(function(data){
			if(data.code==200){
				alert('修改成功');
			}else{
				alert(data.message);
			}
		})
	}
	
});