'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('ModifyMobileContrller', function ($scope, $interval, ModifyMobileService, $location,$cookies, SafetySettingService, ConstantService,UserService,EmailService,SmsService,Dialog) {
 	UserService.getLoginUser().success(function(data){
 			
 				var mobile = data.body.mobile;
        $scope.viewMobile = UserService.getViewMobile(mobile);
        $scope.oldMobile = mobile;

        var email = data.body.email;
        $scope.viewEmail = UserService.getViewEmail(email);
        $scope.oldEmail = email;
        //身份认证的方式
        $scope.useEmail = false;
 	});

  //切换认证方式
  $scope.changeAuthorType = function(){
    $scope.useEmail = !$scope.useEmail;
  }
 	//向已验证手机发送验证码
 	$scope.sendCodeToUserMobile = function(){
 		SmsService.sendCodeToUserMobile()
  			.success(function(response){
  				if(response.code==200){
  					$scope.smsCountDownOld = 60;
  					runSmsTimingOld();

  				}else{
  					Dialog.alert($scope, response.message);
  				}
  			})
  			.error(function(response){
  				  Dialog.alert($scope, '发送失败，请稍后再试');
  			});

 	};

  //已验证手机倒计时
  $scope.sendSmsBtnValueOld = '获取短信校验码';
  var smsTimePromiseOld;
    
  var runSmsTimingOld = function(){
          smsTimePromiseOld = $interval(function(){
              $scope.smsCountDownOld -= 1;
              $scope.sendSmsBtnValueOld = ("重新获取("+$scope.smsCountDownOld+")");
              if($scope.smsCountDownOld<=0){
                $interval.cancel(smsTimePromiseOld);
                $scope.smsCountDownOld = null;
                $scope.sendSmsBtnValueOld = ("重新获取");
              }
          }, 1000, 100);
          return smsTimePromiseOld;
    }
 	//验证短信
  $scope.checkSmsCode = function( smsCode){
      SmsService.checkCode( smsCode).success(function(data){
          if(data.code == 200){
              changeHd(2);
              changeBd(2);
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
            Dialog.alert($scope, response.message);
        }
      })
      .error(function(response){
            Dialog.alert($scope, '发送失败，请稍后再试');
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
             }
             else{
              Dialog.alert($scope, data.message);
             }
      });
    };


 	//向新手机发送验证码
 	$scope.sendcode = function(mobiles){
 		SmsService.sendCode(mobiles)
			.success(function(response){
				if(response.code==200){
					
					$scope.smsCountDownNew = 60;
					runSmsTimingNew();

				}else{
					Dialog.alert($scope, response.message);
				}
			})
			.error(function(response){
				Dialog.alert($scope, '发送失败，请稍后再试');
			});
 	};

  //未验证手机倒计时
    $scope.sendSmsBtnValueNew = '获取短信校验码';
    var smsTimePromiseNew;
    
    var runSmsTimingNew = function(){
          smsTimePromiseNew = $interval(function(){
              $scope.smsCountDownNew -= 1;
              $scope.sendSmsBtnValueNew = ("重新获取("+$scope.smsCountDownNew+")");
              if($scope.smsCountDownNew<=0){
                $interval.cancel(smsTimePromiseNew);
                $scope.smsCountDownNew = null;
                $scope.sendSmsBtnValueNew = ("重新获取");
              }
          }, 1000, 100);
          return smsTimePromiseNew;
    };
 	$scope.refreshMobile = function(mobiles,codes){
 		ModifyMobileService.checkcode(mobiles,codes).success(function(response){
        if(response.code==200){
          changeHd(3);
          changeBd(3);
        }else{
          Dialog.alert($scope, response.message);
        };
    });
   
 		 SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
 	};

 	/*$scope.checks = function(codes){
 		if(codes!=null){
 			$('.red').hide();
 		}else{
 			$('.red').show();
 		}
 	};*/

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
 	

    

    



 });