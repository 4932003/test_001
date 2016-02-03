'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('SetEmailpwdController', function ($scope,Dialog,SetEmailpwdService, ModifyEmailPasswordService, $location,$cookies, SafetySettingService, ConstantService,UserService) {
 		ModifyEmailPasswordService.listUser().success(function(data){
 			var email = data.body.email;
		        $scope.email = email;
		        $scope.viewEmail = UserService.getViewEmail(email);
 				
 		});
 		$scope.user={};
 		$scope.emailcodes = function(){
 			ModifyEmailPasswordService.getcodes()
 			.success(function(response){
				if(response.code==200){
					changeHd(1);
					changeBd(2);
				}else{
					Dialog.alert($scope, response.message);
				}
			});
 		};
 		$scope.emailcheck = function(code){
             $scope.user.tradepwd='';
 			ModifyEmailPasswordService.checkemail(code)
	 			.success(function(response){
					if(response.code==200){
						changeHd(2);
				        changeBd(3);
					}else{
						Dialog.alert($scope, response.message);
					}
				});
 		};
 		$scope.tijiao = function(user){
 			SetEmailpwdService.tijiao(user)	.success(function(response){
				if(response.code==200){
					changeHd(3);
			        changeBd(4);
				}else{
					Dialog.alert($scope, response.message);
				}
			});
		
            SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);

 		};
    $scope.checkpwd = function(user){
    	if(user.tradepwd!= $scope.newpwd){
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