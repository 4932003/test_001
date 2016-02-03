'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 根据注册邮箱 验证手机
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('ModifyEmailController', function ($scope,$location,$interval, ModifyEmailService, ApiService, $cookies, SafetySettingService, ConstantService,UserService,EmailService,SmsService,Dialog) {

	
	
	//获取注册手机号
	UserService.getLoginUser().success(function(data){

		if(data.code == 200){
	         	var mobile = data.body.mobile;
		        $scope.viewMobile = UserService.getViewMobile(mobile);
		        $scope.oldMobile = mobile;

		        var email = data.body.email;
		        $scope.viewEmail = UserService.getViewEmail(email);
		        $scope.oldEmail = email;
		        //身份认证的方式
		        $scope.useEmail = true;

	         }else{
            	Dialog.alert($scope, data.message);
	         }
         
    });

 	//切换认证方式
 	$scope.changeAuthorType = function(){
 		$scope.useEmail = !$scope.useEmail;
 	}
     //发送短信验证码
    $scope.sendCodeToUserMobile = function(){
    	SmsService.sendCodeToUserMobile().success(function(data){
	         if(data.code == 200){
	         	//60s倒计时
	         	$scope.smsCountDown = 60;
    			runSmsTiming();
	         }else{
	         	Dialog.alert($scope, data.message);
	         }
    	});
    };

    //60s倒计时
    var smsTimePromise;
    $scope.sendSmsBtnValue = '获取短信校验码';
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
        };
	//验证短信
    $scope.checkSmsCode = function( smsCode){
    	SmsService.checkCode( smsCode).success(function(data){
    			if(data.code == 200){
		         	changeHd(2);
		         	changeBd(2);
		         	//验证码
	 				$scope.changeCaptcha();
		         }
		         else{
		         	Dialog.alert($scope, data.message);
		         }
    		});
    };
    //邮箱验证码
    $scope.sendCodeToUserEmail = function(){
		EmailService.sendCodeToUserEmail().success(function(response){
				if(response.code == 200){
					//60s倒计时
		         	$scope.emailCountDown = 60;
	    			runEmailTiming();

				}else{
					Dialog.alert($scope, data.message);
				}
			})
			.error(function(response){
				Dialog.alert($scope, '网络异常,请稍后重试');
			});
	};

    var emailTimePromise;
    $scope.sendEmailBtnValue = '获取邮箱校验码';
    
    var runEmailTiming = function(){
          emailTimePromise = $interval(function(){
              $scope.emailCountDown -= 1;
               $scope.sendEmailBtnValue = ("重新获取("+$scope.emailCountDown+")");
              if($scope.emailCountDown<=0){
                $interval.cancel(emailTimePromise);
                $scope.emailCountDown = null;
                $scope.sendEmailBtnValue = ("重新获取");
              }
          }, 1000, 100);
          return emailTimePromise;
    };

    //验证邮箱验证码
    $scope.checkEmailCode = function(emailCode){
    	EmailService.checkCode(emailCode).success(function(data){
    		if(data.code == 200){
		         	changeHd(2);
		         	changeBd(2);
		         	//验证码
	 				$scope.changeCaptcha();
		         }
		         else{
		         	Dialog.alert($scope, data.message);
		         }
    	});
    };

    


	//发送邮箱验证码
	$scope.sendEmailCode = function(email){
		EmailService.sendCode(email).success(function(data){
	         if(data.code == 200){
				//发送成功
				$scope.viewEmail = UserService.getViewEmail(email);
				//安全级别
				SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
	         	changeBd(3);
	         }else{
	         	Dialog.alert($scope, data.message);
	         	//验证码
	 			$scope.changeCaptcha();
	         }
    	});
    };

    //提交修改
	$scope.refreshEmail = function(email, code){

		//成功后修改
		ModifyEmailService.refreshEmail(email, code)
			.success(function(data){
		         if(data.code == 200){
					//发送成功
					$scope.viewEmail = UserService.getViewEmail(email);
					changeHd(3);
		         	changeBd(4);
		         	//安全级别
						SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
		         }else{
		         	Dialog.alert($scope, data.message);
		         	//验证码
		 			$scope.changeCaptcha();
		         }
	    	})
	    	.error(function(data){
	    		Dialog.alert($scope, '网络异常,请稍后重试');
	    	});
    };

   
   


    var changeHd = function(cur){
    	$(".hd"+cur).addClass('cur');
    };

    var changeBd = function(cur){
    	for (var i = 1; i <= 4; i++) {
    		$(".bd"+i).removeClass("on");
    		if(i==cur){
    			$(".bd"+cur).addClass('on');
    		}
    	}
    };

    

    $scope.gotomailbox = function (email){
    	
		var index = email.indexOf("@");
		var host = email.substr(index+1);
		window.open("http://email."+host);
	};

	$scope.changeCaptcha = function(){
		$scope.captcha = (ApiService.api.captcha + '?w=122&a=' + Math.random() ) ;
		$scope.captchaCode = null;
	};

	

	

	
})	;

