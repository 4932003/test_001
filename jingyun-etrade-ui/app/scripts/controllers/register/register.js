'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */

shopApp.controller('RegisterController', function ($scope,$interval,Dialog,RegisterService, $location,UserService,ApiService){

	$(".yizhii").hide();
	$scope.user={};

	$scope.$watch('$viewContentLoaded', function() {  
       $scope.changeCaptcha();
        
    });  
	$scope.register = function(user){
			if($scope.agreent == true){
				
				RegisterService.register(user).success(function(response){
					if(response.code == 200){
						$location.path("/register/success");
					}else{
						$scope.changeCaptcha();
						Dialog.alert($scope, response.message);
					};
				});	
			}else{
				 Dialog.alert($scope, "您没有同意此协议,无法注册！");
			};			
	};

	
	$scope.checkUsername = function(user){
		if(user.username!=null&&user.username!=""){
			UserService.getPhoneExists(user.username).success(function(data){
				if(data.body!=0){
			 		Dialog.alert($scope, "该用户名已经存在！");
				};
			});
		};
	};

	$scope.emailcode = function(user){
		if(user.email!=null){
			UserService.getPhoneExists(user.email).success(function(data){
				if(data.body==0){
					RegisterService.emailcode(user)
						.success(function(response){
							if(response.code == 200){
								//60s倒计时
					         	$scope.emailCountDown = 60;
				    			runEmailTiming();
				    			$(".showhide").addClass('on');
							}else{
								Dialog.alert($scope, response.message);
							}
						})
						.error(function(response){
							
							Dialog.alert($scope, response.message);
						});
				}else{
					
					Dialog.alert($scope, "该邮箱已存在！");
				};
			});
		};
		
	};
	$scope.checkMobile = function(user, valid){
		$scope.existsPhone=false;
		$scope.loadingPhone = true;
		if(user.mobile!=null && user.mobile!="" && valid){
			UserService.getPhoneExists(user.mobile)
			.success(function(data){
				$scope.loadingPhone = false;
				if(data.body!=0){
			 		$scope.existsPhone=true;
				};
			});
		};
	};
	var ifCaptchaChanged = false;
	var ifFirstSendSms = true;
	$scope.mobilecode = function(user){
		if(user.mobile!=null){
			if(ifFirstSendSms || (!ifFirstSendSms && ifCaptchaChanged)){
					RegisterService.mobilecode(user).success(function(response){
						if(response.code == 200){
							//60s倒计时
				         	$scope.smsCountDown = 60;
			    			runSmsTiming();
			    			ifCaptchaChanged = false;
			    			ifFirstSendSms = false;
						}else{
							Dialog.alert($scope, response.message);
						};
					});
				
			}else{
				$scope.changeCaptcha();
				var user = $scope.user;
				user.captchaCode2 = '';
				//$("input[name='captchaCode']").val("") ;
				//$setValidity('captchaCode', false);
			};	
		};
	};

	$scope.goshopping = function(){
			 $location.path("/");
	};
	$scope.getLoginEmail = function(user){
		var index = user.email.indexOf("@");
		var host = user.email.substr(index+1);
		window.open("http://email."+host);
	};
	$scope.emailcodes = false;
	$scope.changeRighttop = function(user){
		$(".bd-top").addClass('cur');
		$scope.emailcodes = false;
		$(".bd-bottom").removeClass('cur');
		user.email=null;
		user.code="";
	};
	$scope.companyRegist = function(){
        Dialog.alert($scope, "敬请期待");
    };
	$scope.changeRightbottom = function(user){
		$(".bd-bottom").addClass('cur');
		$scope.emailcodes = true;
		$(".bd-top").removeClass('cur');
		user.mobile=null;
		user.captchaCode2="";
		user.code="";
	};
	$scope.checkPsw = function(user){
		if($scope.con==user.password){
			$(".yizhii").show();
		}else{	
			$(".yizhii").hide();
		};
	};
	if($scope.changes==true){
		
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
    $scope.changeCaptcha = function(){
		$scope.captcha = (ApiService.api.captcha + '?w=156&a=' + Math.random() ) ;
		ifCaptchaChanged = true;
		$scope.user.captchaCode2 = null;
	};
});

