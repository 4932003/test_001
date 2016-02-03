'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('OrderDetailController', function ($scope, $stateParams, ConstantService, OrderService, OrderStatusService, GoodsOperationService) {
	
	var oid = $stateParams.oid;
    OrderService.singleOrder(oid)
        .success(function(data){
            $scope.order = data.body;
        });
    OrderService.listTraces(oid)
        .success(function(data){
            $scope.traces = data.body;
            $scope.paytime = getTraceTimeByCode(OrderStatusService.PAID_CODE);
            $scope.accepttime = getTraceTimeByCode(OrderStatusService.ACCEPT_CODE);
            $scope.deliveredtime = getTraceTimeByCode(OrderStatusService.DELIVERED_CODE);
            $scope.receivedtime = getTraceTimeByCode(OrderStatusService.RECEIVED_CODE);
        });

    var getTraceTimeByCode = function(code){
        for(var i = 0; i < $scope.traces.length; i++){
            if($scope.traces[i].statusCode == code){
                return $scope.traces[i].addtime;
            }
        }
        return '';
    }
    OrderService.logistic(oid)
        .success(function(data){
            if(data.ok){
                $scope.logistic = data.body;
            }
        });
    $scope.ifNew = function(order){
        return order && (order.statusCode == OrderStatusService.NEW_CODE);
    };
    $scope.ifPay = function(order){
        return order && (order.statusCode == OrderStatusService.PAID_CODE 
            || order.statusCode == OrderStatusService.ACCEPT_CODE 
            || order.statusCode == OrderStatusService.DELIVERED_CODE 
            || order.statusCode == OrderStatusService.RECEIVED_CODE 
            || order.statusCode == OrderStatusService.COMMENTED_CODE);
    };
    $scope.ifDelivering = function(order){
        return order && (order.statusCode == OrderStatusService.ACCEPT_CODE 
            || order.statusCode == OrderStatusService.DELIVERED_CODE 
            || order.statusCode == OrderStatusService.RECEIVED_CODE 
            || order.statusCode == OrderStatusService.COMMENTED_CODE);
    };
    $scope.ifDelivered = function(order){
        return order && (order.statusCode == OrderStatusService.DELIVERED_CODE 
            || order.statusCode == OrderStatusService.RECEIVED_CODE 
            || order.statusCode == OrderStatusService.COMMENTED_CODE);
    };
    $scope.ifReceived = function(order){
        return order && (order.statusCode == OrderStatusService.RECEIVED_CODE 
            || order.statusCode == OrderStatusService.COMMENTED_CODE);
    };
    $scope.ifReceivedAndUncomment = function(order){
        return order && (order.statusCode == OrderStatusService.RECEIVED_CODE);
    };
	
});