'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('HeaderTopController', function ($scope, $http, $location, $cookies, ConstantService, HeaderTopService,HelpCenterCategoryService) {

    //从cookie中获取登录信息
    $scope.$watch('$viewContentLoaded', function() {  
        getLoginUser();    
    });
    
    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    $scope.gcount = 0;
    HeaderTopService.cartCount(loginuid)
        .success(function(data){
            if(data.code==200){
                $scope.gcount = data.body;
            }
            
        });
    $scope.topUser = null;
    var getLoginUser = function(){
    	HeaderTopService.getLoginUser().success(function(data){
    		if(data.code==200){
    			$scope.topUser = data.body;
    		}else{
    			$scope.topUser = null;
    		}
    	});
    }; 

    $scope.logout = function(){
    	HeaderTopService.logout().success(function(data){
    		$scope.topUser = null;
            $cookies.remove(ConstantService.LOGIN_ID_KEY);
    		$location.path("/");
    	});
    };


})