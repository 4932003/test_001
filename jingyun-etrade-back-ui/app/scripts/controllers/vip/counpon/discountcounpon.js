'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('DiscountcounponController', function ($scope,$cookies, ConstantService, DiscountcounponService) {

	 //每页数量
 	$scope.size = 10;
 	//是否显示'展示更多'
 	$scope.more = false;
 	//列表集合
 	$scope.counpons = [];
 	$scope.cash = {};
	$scope.$watch('$viewContentLoaded', function() {  
       
        $scope.list();
    });  

	 $scope.list = function(){
	 	DiscountcounponService.list($scope.cash,0 ,$scope.counpons.length+$scope.size).success(function(data){
	 		if(data.code==200){
	 			//是否显示'更多'
	 			if(data.body.length==($scope.counpons.length+$scope.size)){
	 				$scope.more = true;
	 			}else{
	 				$scope.more = false;
	 			}

	 			$scope.counpons = data.body;
	 		}
	 	});
	 	count();
	 }

	 $scope.reSearch = function(){
	 	DiscountcounponService.list($scope.cash,0 ,$scope.size).success(function(data){
	 		if(data.code==200){
	 			//是否显示'更多'
	 			if(data.body.length==($scope.size)){
	 				$scope.more = true;
	 			}else{
	 				$scope.more = false;
	 			}

	 			$scope.counpons = data.body;
	 		}
	 	});
	 	count();
	 }

	 var count = function(){
	 	DiscountcounponService.count($scope.cash).success(function(data){
	 		if(data.code==200){
	 			
	 			$scope.amount = data.body;
	 		}
	 	});
	 }


	 //全选/反选

 	$scope.chkall = false;
 	$scope.chkAll = function(checked){

 		var list = $scope.counpons;
		 	for(var j = 0; j < list.length; j++){
                list[j].selected = checked;
            }
 	};

 	var selectedIDS = [];

 	$scope.selectItem = function(cash){
 		if(cash.selected){
            selectedIDS.push(cash.id);
        }else{
            selectedIDS.splice(selectedIDS.indexOf(cash.id), 1);
        }
 	};

 	$scope.unlock = function(){
 		if(selectedIDS.length!=0){
 			if(confirm("确定解锁吗")){
 				DiscountcounponService.unlock(selectedIDS.join(",")).success(function(data){
 					if(data.code==200){
 						alert("解锁成功");
 						selectedIDS = [];
 						$scope.reSearch();
 					}else{
 						alert(data.message);
 					}
 				});
 			}
 		}
 	}

	

});