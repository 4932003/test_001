'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MobilepwdController', function ($scope,Dialog,UserService,MobilepwdServices, $location){
	$scope.mobilecode =  function(mobile){
		UserService.getPhoneExists(mobile).success(function(data){
			if(data.body!=0){
				MobilepwdServices.mobilecode(mobile)
				.success(function(response){
					if(response.code==200){
						$('.bpcb3').addClass('on');
						changeHd(1);
						changeBd(1);
					}else{
						Dialog.alert($scope, response.message);
					};
				});
				
			}else{
				Dialog.alert($scope, '该手机号不存在');
			};
		});
	};
	$scope.mobilecheck = function(code){
		MobilepwdServices.mobilecheck(code)
		.success(function(response){
			if(response.code==200){
				changeHd(2);
				changeBd(2);
			}else{
				Dialog.alert($scope, response.message);
			};
		});
	};
	$scope.foundpwd = function(mobile,password){
		MobilepwdServices.foundpwd(mobile,password)
		.success(function(response){
			if(response.code==200){
				changeHd(3);
				changeBd(3);
				setTimeout(function(){
					window.location.href="#/login";
				},2000);
			}else{
				Dialog.alert($scope, response.message);
			};
		});
	};
	
	$scope.changess = function(){
		$location.path("/mailboxpassword");
	};
	var changeHd = function(cur){
    	$(".bpc-mid-"+cur).addClass('on');
    };

    var changeBd = function(cur){
    	for (var i = 1; i <= 4; i++) {
    		$(".bpc-bd"+i).removeClass("cur");
    		if(i==cur){
    			$(".bpc-bd"+cur).addClass("cur");
    		};
    	};
    };
});