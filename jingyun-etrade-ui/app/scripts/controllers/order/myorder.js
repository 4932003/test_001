'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MyOrderController', function ($scope, Dialog, ConstantService, OrderService, RefundStatusService, OrderStatusService, $state, $cookies, CartService, $q) {
    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    if(!loginuid){
        Dialog.alert($scope, "请先登录");
        return;
    }
    var currentpage = 0;
    OrderService.listWithCondition(loginuid, '', '', '', 0, 10)
    .success(function(data){
        if(data.ok){
            $scope.orders = data.body;
            $scope.empty = !($scope.orders && $scope.orders.length > 0);
            currentpage =  $scope.orders ? $scope.orders.length : 0;
            $scope.hasMore = (currentpage == 10);
        }
    });

    $scope.hasMore = false;
    $scope.listMore = function(){
        OrderService.listWithCondition(loginuid, $scope.currentstatus.code, $scope.currentdate.value, $scope.keywords, currentpage, 10)
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

    var now = new Date();
    var latestWeek = new Date((new Date()).setDate(now.getDate() - 7));
    var latestMonth = new Date((new Date()).setMonth(now.getMonth()));
    var latest3Month = new Date((new Date()).setMonth(now.getMonth() - 2));
    var latestYear = new Date((new Date()).setYear(now.getYear() - 1));
    $scope.dateranges = [{'id':'0', 'name':'全部时间', 'value':''}, 
    						{'id':'1', 'name':'最近一周', 'value':latestWeek.getFullYear()+'-'+(latestWeek.getMonth()+1)+'-'+latestWeek.getDate()},
    						{'id':'2', 'name':'最近一个月', 'value':latestMonth.getFullYear()+'-'+latestMonth.getMonth()+'-'+latestMonth.getDate()},
    						{'id':'3', 'name':'最近三个月', 'value':latest3Month.getFullYear()+'-'+latest3Month.getMonth()+'-'+latest3Month.getDate()},
    						{'id':'4', 'name':'最近一年', 'value':latestYear.getFullYear()+'-'+(latestYear.getMonth()+1)+'-'+latestYear.getDate()}];
    //当前日期范围
    $scope.currentdate = $scope.dateranges[0];
    $scope.keywords = '';
    OrderService.listOrderStatus().success(function(data){
    	$scope.orderstatus = data.body;
    	$scope.orderstatus.splice(0, 0, {'code':'', 'name':'全部状态'});
    	$scope.currentstatus = $scope.orderstatus[0];
    });

    $scope.filterByDateAndStatus = function(){
    	if($scope.currentstatus && $scope.currentdate){
    		OrderService.listWithCondition(loginuid, $scope.currentstatus.code, $scope.currentdate.value, $scope.keywords, 0, 10)
	    	.success(function(data){
	    		$scope.orders = data.body;
                $scope.empty = !($scope.orders && $scope.orders.length > 0);
                currentpage =  $scope.orders ? $scope.orders.length : 0;
                $scope.hasMore = (currentpage == 10);
	    	});
    	}
    };
    //当前时间的秒表示形式
    $scope.now = (new Date()).getTime();

    $scope.selectOrder2Cancel = function(order){
        $scope.order2cancel = order;
    };
    $scope.cancelreasons = [
        {'v':'我不想买了'}, {'v':'拍错了，重新拍'}, 
        {'v':'卖家缺货'}, {'v':'付款遇到问题'}, {'v':'其他原因'}
    ];
    $scope.cancelreason = $scope.cancelreasons[0];
    $scope.confirmCancelOrder = function(){
        OrderService.cancel($scope.order2cancel.id, $scope.cancelreason)
            .success(function(data){
                $scope.order2cancel.statusCode = OrderStatusService.CLOSED_CODE;
                $scope.order2cancel.statusName = '订单取消';
                $("#my-order-cancel-confirm-dialog").modal("hide");
            });
    };

    $scope.buyAgain = function(order){
        var deferred = $q.defer();
        var goodses = order.goods;
        var promises = [];
        for(var i = 0; i< goodses.length; i++){
            var goodsincart = {};
            goodsincart.gid = goodses[i].gid;
            goodsincart.gname = goodses[i].gname;
            goodsincart.mid = order.mid;
            goodsincart.mname = order.mname;
            goodsincart.price = goodses[i].price;
            goodsincart.count = goodses[i].count;
            goodsincart.pprice = goodses[i].pprice;
            CartService.addToCart(goodsincart)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                    deferred.reject(data);
                });
        }
        deferred.promise.then(function(data){
            $state.go("cart");
        }, function(data){
            $state.go("cart");
        });
    };

    $scope.isnew = function(order){
        return order.statusCode == OrderStatusService.NEW_CODE;
    };
    $scope.issuccess = function(order){
        return order.statusCode == OrderStatusService.RECEIVED_CODE;
    };
    $scope.canBuyAgain = function(order){
        return order.statusCode == OrderStatusService.CLOSED_CODE || order.statusCode == OrderStatusService.COMMENTED_CODE;
    };
    $scope.isDelivered = function(order){
        return order.statusCode == OrderStatusService.DELIVERED_CODE;
    };
    $scope.canCancel = function(order){
        return order.statusCode == OrderStatusService.NEW_CODE;
    };
    $scope.canRefund = function(order, goods){
        return goods.statusCode == OrderStatusService.RECEIVED_CODE
                || goods.statusCode == OrderStatusService.PAID_CODE
                || goods.statusCode == OrderStatusService.ACCEPT_CODE
                || goods.statusCode == OrderStatusService.DELIVERED_CODE;
    };
    $scope.refundDone = function(order, goods){
        return (goods.statusCode == OrderStatusService.REFUNDED_CODE);
    };

    $scope.refunding = function(goods){
        return goods.statusCode == OrderStatusService.REFUNDING_CODE;
    };
});
