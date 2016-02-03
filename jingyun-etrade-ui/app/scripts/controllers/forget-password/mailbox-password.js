'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('EmailpwdsContrller', function ($scope,Dialog, EmailpwdsService,UserService, $location){
 	$scope.emailcode = function(email){
	 		UserService.getPhoneExists(email).success(function(data){
	 			if(data.body!=0){
	 				EmailpwdsService.emailcode(email).success(function(response){
						if(response.code==200){
							$('.mpcb3').addClass('on');
							changeBd(1);
							changeHd(1);
						}else{
							Dialog.alert($scope, response.message);
						};
					});
		
	 			}else{
	 				Dialog.alert($scope, "该邮箱不存在");
	 			};
 			});
 	};
 	$scope.emailcheck = function(code){
 		EmailpwdsService.emailcheck(code).success(function(response){
			if(response.code==200){
				changeBd(2);
				changeHd(2);
			}else{
				Dialog.alert($scope, response.message);
			};
		});
 	};
 	$scope.forgetpwds = function(email,password){
 		EmailpwdsService.forgetpwds(email,password)
 		.success(function(response){
			if(response.code==200){
				$('.mpc-bd').removeClass("cur");
				changeBdm(3);
				changeHd(3);
				setTimeout(function(){
					window.location.href="#/login";
				},2000);
			}else{
				Dialog.alert($scope, response.message);
			};
		});
 	};
 	$scope.changes = function(){
 		$location.path("/mobileboxpassword");
 	};
 	var changeHd = function(cur){
    	$(".bpc-mid-"+cur).addClass('on');
    };
    var changeBd = function(cur){
    	for (var i = 1; i <= 4; i++) {
    		$(".mpc-bd"+i).removeClass("cur");
    		if(i==cur){
    			$(".mpc-bd"+cur).addClass("cur");
    		};
    	};
    };
    var changeBdm = function(cur){
    	for (var i = 1; i <= 4; i++) {
    		$(".bpc-bd"+i).removeClass("cur");
    		if(i==cur){
    			$(".bpc-bd"+cur).addClass("cur");
    		};
    	};
    };
 });