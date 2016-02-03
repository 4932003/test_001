'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MyRecentlyOrderController', function ($scope,$location, $cookies,OrderService, OrderStatusService, ConstantService) {

	 $scope.$watch('$viewContentLoaded', function() {  
       $scope.getMyOrder('');
       getNewOrderAmount();
       getDeliveredOrderAmount();
       getUnCommenOrderAmount();
        
    });  
	$scope.orders=[];
	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
	//最近订单
	$scope.getMyNewOrder = function(){
    	$scope.getMyOrder(OrderStatusService.NEW_CODE);   	
    };
    $scope.getMyDeliveredOrder = function(){
        $scope.getMyOrder(OrderStatusService.DELIVERED_CODE);
    }
    $scope.getMyUnCommenOrder = function(){
        $scope.getMyOrder(OrderStatusService.RECEIVED_CODE);
    }

    $scope.getMyOrder = function(status){
        OrderService.listWithCondition(uid, status, '', '', 0, 2)
            .success(function(data){
                $scope.orders = data.body;
            });
    };

    //查看待付款订单数量
    var getNewOrderAmount = function(){
    	OrderService.getOrderAmount(OrderStatusService.NEW_CODE, '', '', 0, 2)
	    	.success(function(data){
	    		$scope.newAmount = data.body;
	    	});
    }

    //查看已发货订单数量
    var getDeliveredOrderAmount = function(){
    	OrderService.getOrderAmount(OrderStatusService.DELIVERED_CODE, '', '', 0, 2)
	    	.success(function(data){
	    		$scope.deliveredAmount = data.body;
	    	});
    }
    //查看已接收未评价订单数量
    var getUnCommenOrderAmount = function(){
    	OrderService.getOrderAmount(OrderStatusService.RECEIVED_CODE, '', '', 0, 2)
	    	.success(function(data){
	    		$scope.unCommentAmount = data.body;
	    	});
    }

	


	
})