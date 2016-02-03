'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('RefundRequestController', 
    function ($scope, Dialog, UploadService, $state, ConstantService, OrderService, RefundService, RefundStatusService, $stateParams, $cookies, $q, OrderStatusService) {
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
            $scope.refundVo.money = $scope.goods.payout;
            $scope.refundVo.omoney = $scope.goods.payout;
        });
    if(rid){
        RefundService.single(rid)
            .success(function(data){
                if(data.ok){
                    $scope.refundVo = data.body;
                    $scope.refundVo.certificates = [];
                    var rec = $scope.refundVo.received;
                    $scope.refundVo.received = rec?'true':'false';
                    RefundService.listCertificates(rid)
                    .success(function(data){
                        if(data.ok){
                            $scope.refundVo.certificates = data.body;
                        }
                    }).error(function(data){

                    });
                }
            }).error(function(data){

            });
    }

    $scope.$watch('refundVo.received', function(newv, oldv){
        $scope.reasons = (newv == 'true')?received_refund_reason: unreceived_refund_reason;
    });
    $scope.refundVo = {
        'ogid': ogid, 'oid': oid, 'mid': mid, 'money': '', 'omoney': '', 'received': "false",
        'reason': '', 'returnGoods': false, 'description':'', 'certificates': []
    };
    $scope.hasDelivered = function(){
        return ($scope.received) && (($scope.goods) && ($scope.goods.statusCode == OrderStatusService.DELIVERED_CODE));
    };
    var unreceived_refund_reason = [{'v':'空包裹/少货'}, {'v':'多拍/拍错/不想要'}, {'v':'未按约定时间发货'}, {'v':'一直没有收到货'}, {'v':'其他'}];
    var received_refund_reason = [{'v':'收到商品少件/破损/污渍'}, {'v':'与描述不符'}, {'v':'假冒品牌'}, {'v':'质量问题'}, {'v':'使用后过敏'}, {'v':'尺寸/规格不符'}, {'v':'卖家发错货'}, {'v':'其他'}];
    $scope.reasons = unreceived_refund_reason;
    $scope.selectedReason = $scope.reasons[0];

    $scope.fileNameChanged = function(file){
        if($scope.refundVo.certificates.length >= 3){
            Dialog.alert($scope, "最多上传3张照片。");
            return;
        }
        UploadService.single(file)
            .success(function(data){
                if(data.ok){
                     $scope.refundVo.certificates.push(data.body);
                 }else{
                    Dialog.alert($scope, data.message);
                 }
               
            }).error(function(data){
                Dialog.alert($scope, "服务异常！请重试");
            });
    };

    $scope.submit = function(returnGoods){
        $scope.refundVo.reason = $scope.selectedReason.v;
        $scope.refundVo.returnGoods = returnGoods;
        if($scope.refundVo.money > $scope.goods.payout){
            Dialog.alert($scope, "退款金额不得高于实际订单价格。");
            return;
        }
        if($scope.refundVo.id){
            RefundService.update($scope.refundVo)
            .success(function(data){
                if(data.ok){
                    $state.go("refund-in-progress", {'oid': oid, 'mid': 'mid', 'ogid': ogid, 'rid': rid});
                }else{
                    Dialog.alert($scope, data.message);
                }
            }).error(function(data){

            });
        }else{
            RefundService.submit($scope.refundVo)
            .success(function(data){
                if(data.ok){
                    $state.go("refund-in-progress", {'oid': oid, 'mid': 'mid', 'ogid': ogid, 'rid': rid});
                }else{
                    Dialog.alert($scope, data.message);
                }
            }).error(function(data){
                 Dialog.alert($scope, "服务异常！请重试");
            });
        }
        
    };
    $scope.removeImg = function(imgpath){
        $scope.refundVo.certificates.splice($scope.refundVo.certificates.indexOf(imgpath), 1);
    };
});
