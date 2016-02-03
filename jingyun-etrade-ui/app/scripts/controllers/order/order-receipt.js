'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('OrderReceiptController', function ($scope, $timeout, OrderService, $state, $stateParams, Dialog) {
    var oid = $stateParams.oid;
    OrderService.singleOrder(oid)
        .success(function(data){
            $scope.order = data.body;
        });
    $scope.tradepwd = '';
    $scope.message = '';

    $scope.confirmReceipt = function(){
        if($scope.tradepwd){
            $scope.tradepwderror = false;
            OrderService.confirmReceipt(oid, $scope.tradepwd)
            .success(function(data){
                if(data.ok){
                    Dialog.success($scope, "您已成功确认收货，本次交易成功，谢谢！")
                    .on("hide.bs.modal", function(e){
                        $state.go("user-center.my-order");
                    });
                }else{
                    Dialog.alert($scope, data.message);
                }
            });
        }else{
            $scope.tradepwderror = true;
        }
    };
});
