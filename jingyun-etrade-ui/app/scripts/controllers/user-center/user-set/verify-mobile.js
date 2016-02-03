'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 根据注册邮箱 验证手机
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('VerifyMobileController', function ($scope , $interval, VerifyMobileService, $cookies, SafetySettingService, ConstantService,UserService,EmailService,SmsService,Dialog) {

	//获取邮箱
	UserService.getLoginUser().success(function(data){

		if(data.code == 200){
	         	var email = data.body.email;
		        $scope.email = email;
		        $scope.viewEmail = UserService.getViewEmail(email);
                if (data.body.mobile!=null && data.body.mobile!='' && data.body.mobile!=undefined) {
                    changeHd(2);
                    changeHd(3);
                    changeBd(4);
                    SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
                }



	         }else{
	         	Dialog.alert($scope, data.message);
	         }
         
    });

	//发送邮箱验证码
	
	$scope.sendEmail = function(){
		EmailService.sendCodeToUserEmail().success(function(data){
	         if(data.code == 200){
				//发送成功
	         	changeBd(2);
	         }else{
	         	Dialog.alert($scope, data.message);
	         }
    	});
    }

    //验证邮箱验证码
    $scope.checkEmailCode = function(code){
    	EmailService.checkCode(code)
    		.success(function(data){
    			if(data.code == 200){
		         	changeHd(2);
		         	changeBd(3);
		         }
		         else{
		         	Dialog.alert($scope, data.message);
		         }
    		}
    	)
    }
    //60s倒计时
    $scope.sendSmsBtnValue = '获取短信校验码';
    var smsTimePromise;
    var runSmsTiming = function(){
          smsTimePromise = $interval(function(){
              $scope.smsCountDown -= 1;
              $scope.sendSmsBtnValue = ("重新获取("+$scope.smsCountDown+")");
              if($scope.smsCountDown<=0){
                $interval.cancel(smsTimePromise);
                $scope.smsCountDown = null;
                $scope.sendSmsBtnValue = ("重新获取");
              }
          }, 1000, 100);
          return smsTimePromise;
        }
    $scope.checkIfExists = function(key, valid){
        if(valid){
            $scope.checkPhoneing = true;
            UserService.getKeyExists(key)
                .success(function(data){
                    $scope.checkPhoneing = false;
                    if(data.body){
                        $scope.phoneExists = true;
                    }else{
                        $scope.phoneExists = false;
                    }
                })
                .error(function(data){
                    $scope.checkPhoneing = false;
                })
        }
        
    }    

    //发送短信验证码
    $scope.sendSms = function(mobile){
    	SmsService.sendCode(mobile).success(function(data){
	         if(data.code == 200){
                //60s倒计时
                $scope.smsCountDown = 60;
                runSmsTiming();
	         }else{
	         	Dialog.alert($scope, data.message);
	         }
    	});
    }

    //验证短信
    $scope.refreshMobile = function(mobile, smsCode){
    	VerifyMobileService.refreshMobile(mobile, smsCode)
    		.success(function(data){
    			if(data.code == 200){
		         	changeHd(3);
		         	changeBd(4);
                    SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
		         }
		         else{
		         	Dialog.alert($scope, data.message);
		         }
    		}
    	)
    }


    //更改头部样式
    var changeHd = function(cur){
    	$(".hd"+cur).addClass('cur');
    }
    //更改表单样式
    var changeBd = function(cur){
    	for (var i = 1; i <= 4; i++) {
    		$(".bd"+i).removeClass("on");
    		if(i==cur){
    			$(".bd"+cur).addClass('on');
    		}
    	}
    }

    

})	