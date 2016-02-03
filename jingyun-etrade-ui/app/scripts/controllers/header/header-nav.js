'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('HeaderNavController', function ($scope, $http,$state,$location, GoodsService) {

	$scope.showMenuFlag = false;
		  $scope.brandTree = [
                {bid:'9QMrO9RdTpOfe6-QIjkq6g',brandName:'东阿阿胶'},
                {bid:'wNRHDXbJRa-yaEO70CuEPQ',brandName:'三斤驴皮'},
                {bid:'IxgNj1QwSs-Vqzl73lyIpA',brandName:'贡禧堂'},
                {bid:'ym7Jwc33SGW7PB2uGqz3zw',brandName:'尚胶佳人'},
                {bid:'MZKzV6mGRb63M6LTncilBw',brandName:'盛东堂'}
        ];

         $scope.typeTree = [
                {tid:'1',typeName:'阿胶块'},
                {tid:'2',typeName:'阿胶糕'},
                {tid:'3',typeName:'阿胶浆'},
                {tid:'4',typeName:'阿胶原粉'},
                {tid:'ZIa2xn1QS1i1j8LcVNwQmA',typeName:'阿胶枣'}
        ];

      // -----判断是否显示menu菜单  当首页 和 商城页时显示 其余隐藏
     var thisState = $state.current.name;
     if(thisState == 'index'){
     	$scope.showMenuFlag = true;
     }else if (thisState == 'mall'){
     	$scope.showMenuFlag = true;
     }else{
     	$scope.showMenuFlag = false;
     }
     //------

	//全部商品分类menu菜单显示 6条品牌
	GoodsService.brandThree(0,5).success(function(data){
		$scope.brandTree = data.body;
	});
	//全部商品分类menu菜单显示 6条类别
	GoodsService.typeThree(0,5).success(function(data){
		$scope.typeTree = data.body;
	});


/*
		 //点击类别进入
	 $scope.toType = function (type){
	 	//console.log(type.typeName);
	 	$state.go('mall',{flag:3,tid:type.tid,tname:type.typeName,bid:"",bname:""});	
	 };
		//点击品牌进入
	$scope.toBrand = function (brand){
 		$state.go('mall',{flag:3,bid:brand.bid,bname:brand.brandName,tid:"",tname:""});	
	 };*/
});