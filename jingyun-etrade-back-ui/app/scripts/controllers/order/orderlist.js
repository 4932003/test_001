'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('OrderListController', function ($scope, ConstantService, OrderService, GoodsOperationService, OrderStatusService) {
	
	GoodsOperationService.merchantlist().success(function(data){
        $scope.merchantlist =data.body;
    });

	$scope.gname = '';
	$scope.uname = '';
	$scope.fromdate = '';
	$scope.enddate = '';
	$scope.orderno = '';
	$scope.mid = '';

	$scope.search = function(){
		$scope.fromdate = $("#fromtime").val();
		$scope.enddate = $("#endtime").val();
		OrderService.listWithCondition($scope.mid, 0, 10, $scope.currentstatus.code, $scope.orderno, $scope.gname, $scope.uname, '', $scope.fromdate, $scope.enddate)
		.success(function(data){
			$scope.orders = data.body;
			$scope.hasData = ($scope.orders && $scope.orders.length > 0);
			currentpage =  $scope.orders ? $scope.orders.length : 0;
            $scope.hasMore = (currentpage == 10);
		});
		OrderService.count($scope.mid, $scope.currentstatus.code, $scope.orderno, $scope.gname, $scope.uname, '', $scope.fromdate, $scope.enddate)
		.success(function(data){
			$scope.count = data.body;
		});
	};

	var currentpage = 0;
	$scope.hasMore = false;
    $scope.listMore = function(){
        OrderService.listWithCondition($scope.mid, currentpage, 10, $scope.currentstatus.code, $scope.orderno, $scope.gname, $scope.uname, '', $scope.fromdate, $scope.enddate)
		.success(function(data){
            if(data.ok){
                for (var i = 0; i <data.body.length; i++) {
                    $scope.orders.push(data.body[i]);
                }
                var len = ($scope.orders.length);
                currentpage = len;
                $scope.hasMore = (data.body.length == 10);
            }else{
                $scope.hasMore = false;
            }
        });
    };

	OrderService.listOrderStatus().success(function(data){
    	$scope.orderstatus = data.body;
    	$scope.orderstatus.splice(0, 0, {'code':'', 'name':'全部状态'});
    	$scope.currentstatus = $scope.orderstatus[0];
    });

	$scope.canCancel = function(order){
        return order.statusCode == OrderStatusService.NEW_CODE;
    };

    $scope.closeOrder = function(order){
    	if(confirm("是否确定要关闭该交易？")){
    		OrderService.cancel(order.id, "卖家关闭交易。")
            .success(function(data){
            	if(data.ok){
            		order.statusCode = OrderStatusService.CLOSED_CODE;
                	order.statusName = '交易关闭';
            	}else{
            		alert(data.message);
            	}
            });
    	}
    };

    $scope.canAccept = function(order){
    	return order.statusCode == OrderStatusService.PAID_CODE;
    };

    $scope.acceptOrder = function(order){
    	OrderService.accept(order)
		.success(function(data){
			if(data.ok){
				order.statusCode = OrderStatusService.ACCEPT_CODE;
                order.statusName = '出库中';
			}else{
				alert(data.message);
			}
		}).error(function(){
			alert("网络异常，稍后重试。");
		});
    };
	
});