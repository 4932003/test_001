
'use strict';


/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('ModifyPaypwdController', function ($interval,$scope,ModifyPaypwdsService, ModifyLoginPasswordService, $location,$cookies, SafetySettingService, ConstantService,UserService,Dialog) {
 	ModifyLoginPasswordService.listUser().success(function(data){
 			
 				var mobile = data.body.mobile;
		        $scope.viewMobile = UserService.getViewMobile(mobile);
		        $scope.mobile = mobile;
 	});
 	$scope.user={};
 	$scope.getcodes = function(){
 		$scope.user.code='';
 		ModifyLoginPasswordService.getcode()
				.success(function(response){
					if(response.code==200){
						//60s倒计时
			         	$scope.smsCountDown = 60;
		    			runSmsTiming();
					}else{
						Dialog.alert($scope, response.message);
					}
				})
				.error(function(response){
					Dialog.alert($scope, '发送失败，请稍后再试');
				});
 	};
 	$scope.checkcodes = function(user){
 		$scope.user.tradepwd='';
 		ModifyLoginPasswordService.submits(user).success(function(response){
				if(response.code==200){
					changeHd(2);
			        changeBd(2);
				}else{
					Dialog.alert($scope, response.message);
				}
			});
 		
 	};
 	$scope.tijiao = function(user){
 		ModifyPaypwdsService.tijiao(user).success(function(response){
			if(response.code==200){
				changeHd(3);
		        changeBd(3);
			}else{
				Dialog.alert($scope, response.message);
			};
		});
		
 		SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
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
	     $scope.checkpwd = function(user){
	     	if(user.tradepwd!=$scope.newpwd){
	     		$scope.hideshow=true;
	     	}else{
	     		$scope.hideshow=false;
	     	};
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
 });
