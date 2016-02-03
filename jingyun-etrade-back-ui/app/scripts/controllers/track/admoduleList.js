'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('AdmoduleListController', function ($scope,$state,$routeParams,$route,$location,AdmoduleListService) {
	$scope.name = '';
	//默认查询
	AdmoduleListService.queryAdmoduleList('',0,100)
				.success(function(data){
					$scope.admodulelist = data.body;
				});
    //搜索查询
    $scope.serch = function(){
    	 AdmoduleListService.queryAdmoduleList($scope.name,0,100)
				.success(function(data){
					$scope.admodulelist = data.body;
				});
    };
     $scope.removeAdmodule =function(id){ 
    AdmoduleListService.removeAdmodule(id).success(function(data){
    	  var code = data.code;
    	  if(code = '500'){
    	  	alert(data.message);
    	  }else{
          alert('删除成功！');
        };
    	  AdmoduleListService.queryAdmoduleList($scope.name,0,100)
				.success(function(data){
          $state.go('station-goods.admodule-list');
					$scope.admodulelist = data.body;
				});
         });
  	};
});