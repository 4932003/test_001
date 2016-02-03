'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('RefundProgressController', 
    function ($scope, $state, ConstantService, OrderService, RefundService, RefundStatusService, $stateParams, $cookies, $q, OrderStatusService, Dialog) {
    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    if(!loginuid){
        $("#login-dialog").modal("show");
        return;
    }
    var oid = $stateParams.oid;
    var ogid = $stateParams.ogid;
    var mid = $stateParams.mid;
    var rid = $stateParams.rid;

    if(!ogid){
    	$state.go("404");
    	return;
    }

    if((!oid || !ogid || !mid) && !rid){
    	$state.go("404");
    	return;
    }

    OrderService.singleGoods(ogid)
        .success(function(data){
            $scope.goods = data.body;
        });

    if(!rid){
	    RefundService.singleByOGID(ogid)
	    	.success(function(data){
	    		if(data.ok){
	    			$scope.refund = data.body;
                    calculateRemainingTime();

                    RefundService.listTraces($scope.refund.id)
                        .success(function(data){
                            if(data.ok){
                                $scope.traces = data.body;
                                $scope.acceptTrace = getTraceByCode(RefundStatusService.ACCEPT_CODE);
                                $scope.doneTrace = getTraceByCode(RefundStatusService.DONE_CODE);
                                $scope.denyTrace = getTraceByCode(RefundStatusService.DENIED_CODE);
                            }
                        }).error(function(data){

                        });
                    RefundService.logistic($scope.refund.id)
                        .success(function(data){
                            if(data.ok){
                                $scope.logistic = data.body;
                            }
                        }).error(function(data){

                        });
	    		}
	    	}).error(function(data){

	    	});
    }else{
    	RefundService.single(rid)
	    	.success(function(data){
	    		if(data.ok){
	    			$scope.refund = data.body;
                    calculateRemainingTime();
	    		}
	    	}).error(function(data){

	    	});
        RefundService.listTraces(rid)
            .success(function(data){
                if(data.ok){
                    $scope.traces = data.body;
                    $scope.acceptTrace = getTraceByCode(RefundStatusService.ACCEPT_CODE);
                    $scope.doneTrace = getTraceByCode(RefundStatusService.DONE_CODE);
                    $scope.denyTrace = getTraceByCode(RefundStatusService.DENIED_CODE);
                }
            }).error(function(data){

            });
        RefundService.logistic(rid)
            .success(function(data){
                if(data.ok){
                    $scope.logistic = data.body;
                }
            }).error(function(data){

            });
    };

    var calculateRemainingTime = function(){
        var now = new Date();
        var oneday = 24*60*60*1000;
        var onehour = 60*60*1000;
        var oneminute = 60*1000;
        var tenDays = 10 * oneday;
        var accepttime = $scope.refund.addtime + tenDays;
        if(accepttime <= now){
            $scope.daytoaccept = 0;
            $scope.hourtoaccept = 0;
            $scope.minutetoaccept = 0;
            return;
        }
        var addtime = (accepttime - now);

        $scope.daytoaccept = Math.floor(addtime/oneday);
        $scope.hourtoaccept = Math.floor((addtime - ($scope.daytoaccept * oneday))/onehour);
        $scope.minutetoaccept = Math.floor((addtime - (($scope.daytoaccept * oneday) + ($scope.hourtoaccept * onehour)))/oneminute);
    };

    var getTraceByCode = function(code){
        if(!$scope.traces) return ;
        for(var i = 0; i < $scope.traces.length; i++){
            if($scope.traces[i].statusCode == code){
                return $scope.traces[i];
            }
        }
        return;
    };

    $scope.cancelRefund = function(){
        if(!$scope.refund) {
            Dialog.alert("您提交的退款请求信息有误，请稍后重试。");
            return;
        }
    	
		RefundService.cancel($scope.refund.id)
			.success(function(data){
				if(data.ok){
					$state.go("user-center.my-order");
				}else{
					Dialog.alert($scope, data.message);
				}
			}).error(function(){
                Dialog.alert($scope, "网络异常，请稍后重试。");
            });
    };

    //卖家接受买家的退货申请，买家需要寄回货物并填写物流信息
    $scope.stepReturnAccepted = function(refund){
        return refund && refund.returnGoods && refund.statusCode == RefundStatusService.ACCEPT_CODE;
    };
    $scope.stepRefundDenied = function(refund){
        return refund && refund.statusCode == RefundStatusService.DENIED_CODE;
    };
    //买家退款申请成功，等待卖家批准
    $scope.stepRefundRequestSuccess = function(refund){
        return refund && !refund.returnGoods && refund.statusCode == RefundStatusService.REQUEST_CODE;
    };
    //买家退货申请成功
    $scope.stepReturnRequestSuccess = function(refund){
        return refund && refund.returnGoods && refund.statusCode == RefundStatusService.REQUEST_CODE;
    };
    //买家成功提交退货物流信息，等待卖家的最后处理
    $scope.stepLogisticSubmit = function(refund){
        return refund && refund.returnGoods && refund.statusCode == RefundStatusService.RETURN_CODE;
    };
    //卖家同意了买家的退款退货申请
    $scope.refundDone = function(refund){
        return refund && (refund.statusCode == RefundStatusService.DONE_CODE || refund.statusCode == RefundStatusService.CANCEL_CODE);
    };
    $scope.refundSuc = function(refund){
        return refund && (refund.statusCode == RefundStatusService.DONE_CODE);
    };
    $scope.refundCancel = function(refund){
        return refund && (refund.statusCode == RefundStatusService.CANCEL_CODE);
    };
    $scope.logistic = {'rid': '', 'expressno':'', 'expressName':'', 'receiver': ''};

    $scope.saveLogistic = function(){
        $scope.logistic.rid = $scope.refund.id;
        RefundService.saveLogistic($scope.logistic)
            .success(function(data){
                if(data.ok){
                    $state.go("refund-in-progress", {'oid': oid, 'mid': 'mid', 'ogid': ogid, 'rid': rid});
                }else{
                    Dialog.alert($scope, data.message);
                }
            }).error(function(data){
                Dialog.alert($scope, "网络异常，请稍后重试。");
            });
    };
});
