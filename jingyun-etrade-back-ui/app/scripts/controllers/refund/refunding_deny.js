'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('RefundingDenyController', function ($scope, $state, $stateParams, ConstantService, RefundService) {
	
    $scope.note = '';
    $scope.rid = $stateParams.rid;

    $scope.deny = function(){
        if($scope.note){
            RefundService.deny($scope.rid, $scope.note)
                .success(function(data){
                    alert("您已经拒绝买家退款申请。");
                    $state.go("trading-center.refunding-list");
                    return;
                });
        }else{
            alert("请填写拒绝原因。");
            return;
        }
    }

});