'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('RefundingReceiverController', function ($scope, $state, $stateParams, ConstantService, RefundService) {
	
    $scope.receiver = '';
    $scope.address = '';
    $scope.mobile = '';
    $scope.rid = $stateParams.rid;

    $scope.accept = function(){
        if($scope.receiver && $scope.address && $scope.mobile){
            RefundService.accept($scope.rid, $scope.receiver+","+$scope.mobile+","+$scope.address)
                .success(function(data){
                    alert("您已同意买家的退款申请，等待买家退货。");
                    $state.go("trading-center.refunding-accept");
                    return;
                });
        }else{
            alert("请完善收货地址告知买家！");
            return;
        }
    }

});