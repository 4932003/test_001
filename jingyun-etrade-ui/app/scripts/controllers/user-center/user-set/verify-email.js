'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 根据注册邮箱 验证手机
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('VerifyEmailController', function ($scope,$location, $interval,VerifyEmailService , ApiService, $cookies, SafetySettingService, ConstantService,UserService,Dialog) {

	

	
	//获取注册手机号
	VerifyEmailService.getUser().success(function(data){

		if(data.code == 200){
	         	var mobile = data.body.mobile;
		        $scope.viewMobile = UserService.getViewMobile(mobile);
		        $scope.mobile = mobile;
		        if (data.body.email!=null && data.body.email!='' && data.body.email!=undefined) {
		        	changeHd(2);
					changeHd(3);
					changeBd(4);
					//安全级别
					SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
		        }

	         }else{
	         	Dialog.alert($scope, data.message);
	         }
         
    });
    
    //发送短信验证码
    $scope.sendSms = function(){
    	VerifyEmailService.sendSms().success(function(data){
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
    $scope.checkSmsCode = function( smsCode){
    	VerifyEmailService.checkSmsCode( smsCode)
    		.success(function(data){
    			if(data.code == 200){
		         	changeHd(2);
		         	changeBd(2);
		         	//验证码
	 				$scope.changeCaptcha();
		         }
		         else{
		         	Dialog.alert($scope, data.message);
		         }
    		}
    	)
    }


	//发送邮箱验证码
	$scope.sendEmailCode = function(email){
		VerifyEmailService.sendEmailCode(email).success(function(data){
	         if(data.code == 200){
				//发送成功
				$scope.viewEmail = UserService.getViewEmail(email);
	         	changeBd(3);
	         	//$scope.emailCountDown = 60;
	         	//runEmailTiming();
	         }else{
	         	Dialog.alert($scope, data.message);
	         	//验证码
	 			$scope.changeCaptcha();
	         }
    	});
    }

    

    //提交修改
	$scope.refreshEmail = function(email, code){

		//成功后修改
		VerifyEmailService.refreshEmail(email, code).success(function(data){
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
    	});
    }

   
   


    var changeHd = function(cur){
    	$(".hd"+cur).addClass('cur');
    }

    var changeBd = function(cur){
    	for (var i = 1; i <= 4; i++) {
    		$(".bd"+i).removeClass("on");
    		if(i==cur){
    			$(".bd"+cur).addClass('on');
    		}
    	}
    }

    

    

    $scope.gotomailbox = function (email){
    	
		var index = email.indexOf("@");
		var host = email.substr(index+1);
		window.open("http://email."+host);
	}

	$scope.changeCaptcha = function(){
		$scope.captcha = (ApiService.api.captcha + '?w=122&a=' + Math.random() ) ;
		$scope.captchaCode = null;
	}


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
        }
	
    var emailTimePromise;
    $scope.sendEmailBtnValue = '获取邮箱校验码';
    
    var runEmailTiming = function(){
          emailTimePromise = $interval(function(){
              $scope.emailCountDown -= 1;
               $scope.sendEmailBtnValue = ("重新获取("+$scope.emailCountDown+")");
              if($scope.emailCountDown<=0){
                $interval.cancel(emailTimePromise);
                $scope.emailCountDown = null;
                $scope.sendEmailBtnValue = ("重新获取("+$scope.emailCountDown+")");
              }
          }, 1000, 100);
          return emailTimePromise;
        }

	
})	