'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 根据注册邮箱 验证手机
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('SafetySettingController', function ($scope, $location , $cookies, SafetySettingService, ConstantService, UserService,Dialog) {

	

 		//获取用户信息
		UserService.getLoginUser()
			.success(function(data){
				if(data.code == 200){
		         	var mobile = data.body.mobile;
			        var email =  data.body.email;
			        $scope.email = email;
                    $scope.mobile = mobile;
                    $scope.viewEmail = UserService.getViewEmail(email);
                    $scope.viewMobile = UserService.getViewMobile(mobile);
                    if(data.body.password != data.body.tradepwd){
                        $scope.tradepwd  = true; 
                    }else{
                         $scope.tradepwd  = false; 
                    }

		         }else{
		         	Dialog.alert($scope, data.message);
		         }
	         
	    	})
	    	.error(function(){
	    		
	    	});
		
	
        //安全级别
            SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
            

	
});	