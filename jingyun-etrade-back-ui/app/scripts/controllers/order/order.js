'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('OrderController', function ($scope, ConstantService, OrderService, GoodsOperationService, OrderStatusService) {
	
	GoodsOperationService.merchantlist().success(function(data){
        $scope.merchantlist =data.body;
    });

	$scope.condition = {};
	
	$scope.search2Accept = function(){
		OrderService.listWithCondition($scope.mid, 0, 10, OrderStatusService.PAID_CODE)
		.success(function(data){
			$scope.orders = data.body;
		});
	};

	$scope.accept = function(order){
		OrderService.accept(order)
		.success(function(data){
			if(data.ok){
				$scope.orders.splice($scope.orders.indexOf(order), 1);
			}else{
				alert(data.message);
			}
		}).error(function(){
			alert("网络异常，稍后重试。");
		});
	};

	$scope.searchDelivering = function(){
		OrderService.listWithCondition($scope.mid, 0, 10, OrderStatusService.ACCEPT_CODE)
		.success(function(data){
			if(data.ok){
				$scope.orders = data.body;
				for (var i = 0; i < $scope.orders.length; i++) {
					var order = $scope.orders[i];
					order.logistic = {'expressno':'', 'expressName':'', 'oid':order.id, 'typeCode':order.deliveryTypeCode, 'typeName':order.deliveryTypeName};
				};
			}
		});
	};

	$scope.delivered = function(order){
		if(!order.logistic || !order.logistic.expressno || !order.logistic.expressName){
			alert("请完善物流信息！");
			return;
		}
		OrderService.delivered(order.logistic)
		.success(function(data){
			if(data.ok)
				$scope.orders.splice($scope.orders.indexOf(order), 1);
			else
				alert(data.message);
		}).error(function(data){
			alert("网络异常，稍后重试。")
		});
	};

	$scope.searchDelivered = function(){
		OrderService.listWithCondition($scope.mid, 0, 10, OrderStatusService.DELIVERED_CODE)
		.success(function(data){
			$scope.orders = data.body;
		});
	};
	
});