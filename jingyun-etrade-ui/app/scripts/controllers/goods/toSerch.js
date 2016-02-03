'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('ToSerchController', function ($scope, $state,GoodsService) {


		  $scope.brands = [
	                {bid:1,brandName:'东阿阿胶'},
	                {bid:2,brandName:'贡禧堂'},
	                {bid:3,brandName:'桃花姬'},
	        ];

         $scope.types = [
                {tid:1,typeName:'阿胶块'},
                {tid:2,typeName:'阿胶糕'},
                {tid:3,typeName:'阿胶浆'},
        ];

	GoodsService.brandThree(0,3).success(function(data){
		$scope.brands = data.body;
	});
	GoodsService.typeThree(0,3).success(function(data){
		$scope.types = data.body;
	});


/*		 //点击类别进入
	 $scope.toType = function (type){
	 	//console.log(type.typeName);
	 	$state.go('mall',{flag:3,tid:type.tid,tname:type.typeName,bid:"",bname:""});	
	 };
		//点击品牌进入
	$scope.toBrand = function (brand){
 		$state.go('mall',{flag:3,bid:brand.bid,bname:brand.brandName,tid:"",tname:""});	
	 };
*/

	$scope.enter = function(event){
		 if(event.keyCode == '13'){
		 	if($scope.goodsname!=null){
		 		$state.go('mall',{goodsname:$scope.goodsname,flag:2,bid:"",bname:"",tid:"",tname:""});	
		 	}
		 	
		 }
	};
	$scope.serch= function(){
			$state.go('mall',{goodsname:$scope.goodsname,flag:2,bid:"",bname:"",tid:"",tname:""});	
	};
  });