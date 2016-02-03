'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('HeaderTopController', function ($scope,$cookies,$state,UserService,HeaderTopService,ManagerService,SellerService) {

	//卖家
	
    	ManagerService.current().success(function(data){
			if(data.code==200){
				$scope.topUsername = data.body.mname;
			}else{
				$state.go("login");
			}
			
		})

	$scope.logout = function(){
		HeaderTopService.logout().success(function(data){
			$state.go("login",{w:'logout'});
		})
	}

});