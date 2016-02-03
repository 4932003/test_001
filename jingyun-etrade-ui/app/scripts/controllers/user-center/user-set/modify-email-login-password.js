'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('ModifyEmailPasswordContrller', function ($scope,Dialog, ModifyEmailPasswordService, $location,$cookies, SafetySettingService, ConstantService,UserService) {
 		ModifyEmailPasswordService.listUser().success(function(data){
 			var email = data.body.email;
		        $scope.email = email;
		        $scope.viewEmail = UserService.getViewEmail(email);
 				
 		});
 		$scope.user={};

 		$scope.getcodes = function(){
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
 		$scope.checkemail = function(code){
            $scope.user.password='';
 			ModifyEmailPasswordService.checkemail(code).success(function(response){
				if(response.code==200){
					changeHd(2);
			        changeBd(3);
				}else{
					Dialog.alert($scope, response.message);
				}
			});
 		};
 		$scope.tjsuccess = function(user){

 			ModifyEmailPasswordService.tjsuccess(user).success(function(response){
				if(response.code==200){
					changeHd(3);
			        changeBd(4);
				}else{
					Dialog.alert($scope, response.message);
				}
			});
		
            SafetySettingService.getSafetyLevelObj($cookies.get(ConstantService.LOGIN_ID_KEY), $scope);
 		};
 		
 		$scope.checkPwd = function(user){
 			if(user.password!=$scope.new){
 				$scope.showhide=true;
 			}else{
 				$scope.showhide=false;
 			}
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
 });