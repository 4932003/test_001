'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('SafetySettingService', function ($http, $location , ApiService) {
    this.getUser = function(){
        return $http.get(ApiService.api.user.getLoginUser);
    };

   this.getSafetyLevel = function(uid){
   		return $http.get(ApiService.api.safetyCenter.getSafetyLevel+'/'+uid);
   }

   

   this.getSafetyLevelObj = function(uid, $scope){
	   	
   		$http.get(ApiService.api.safetyCenter.getSafetyLevel+'/'+uid)
   			.success(function(data){
                if(data.code == 200){
                    var lev = data.body
                    var levName = '低';
                    if(lev>33 && lev<=66){
                        levName = '中';
                    }else if(lev>66){
                        lev = 100;
                        levName = '高';
                    }
               		
					          $scope.level = lev;
                    $scope.levelName = levName;
                 }
             
            })
            .error(function(){
            	$scope.level = '30';
                $scope.levelName = '低';
            });
   }
  
    
});
