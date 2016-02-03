'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('SalesRecordsController', function ($scope, $state,$stateParams,GoodsService) {

		var gid = $state.params.gid;
		//交易记录集合
		$scope.salesrecords = [];
		$scope.salesSize=3;
		$scope.salerecordsFlag=false;

		//查询交易记录
		GoodsService.salesRecords(gid,$scope.salesrecords.length,$scope.salesSize).success(function(data){
			
			for (var i=0; i<data.body.length;i++) {
				$scope.salesrecords.push(data.body[i]);
			}

			if(data.body.length==$scope.salesSize){
				$scope.salerecordsFlag=true;
			}else{
				$scope.salerecordsFlag=false;
			}
		});

		//查看更多
		$scope.querymax =function(){
			GoodsService.salesRecords(gid,$scope.salesrecords.length,$scope.salesSize).success(function(data){
				for (var i=0; i<data.body.length;i++) {
					$scope.salesrecords.push(data.body[i]);
				}

				if(data.body.length==$scope.salesSize){
					$scope.salerecordsFlag=true;
				}else{
					$scope.salerecordsFlag=false;
				}
			});
		};
 });