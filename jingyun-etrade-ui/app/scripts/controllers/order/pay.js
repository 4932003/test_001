'use strict';

shopApp.controller('PayController', function ($scope, Dialog, $state, $element, $window, $timeout, $stateParams, $sce, PayService, $cookies, ConstantService) {
    $scope.type = 'thirdparty';
    $scope.bankcode = 'ALIPAY';
    $scope.bankname = '支付宝';
    //$scope.tradepwd = '';

    $scope.pay = function(){
        var payrequestvo = {'pipelineCode':'', 'pipelineName':'', 'bankCode': $scope.bankcode, 'payments': $scope.payments};
        var $type = $scope.type;
        if($type == 'thirdparty'){
            payrequestvo.pipelineCode = $scope.bankcode;
            payrequestvo.pipelineName = $scope.bankname;
        }else if($type == 'fastway'){
            payrequestvo.pipelineCode = 'FASTPAY';
            payrequestvo.pipelineName = '快捷支付';
        }else{
            payrequestvo.pipelineCode = 'GATEPAY';
            payrequestvo.pipelineName = '网银支付';
        }
    	PayService.getPayInfo(payrequestvo).success(function(data){
            if(data.code == 200){
                $scope.paymentinfos = data.body;
                $scope.payurl = $sce.trustAsResourceUrl(data.body.payurl);
                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    var btn = document.getElementById("PayFormSubmitBtn");
                    angular.element(btn).trigger('click');
                    $scope.paymentinfos = {};
                    $scope.payurl = '';
                });
                $("#order-success-dialog").modal("show");
            }else{
                Dialog.alert($scope, data.message);
            }
    		
    	}).error(function(data){
    		Dialog.alert($scope, data.message);
    	});
    };

    $scope.oids = $stateParams.oids.split("&");
    PayService.init($scope.oids).success(function(data){
      if(data.ok){
        $scope.payments = data.body;
        $scope.paymoney = 0;
        for(var i = 0; i < data.body.length; i++){
          $scope.paymoney += data.body[i].money;
        }
      }else{
        Dialog.alert($scope, data.message);
        $state.go("login");
      }
    }).error(function(data){
      Dialog.alert("网络错误，请稍后重试。");
    });

    $scope.displayOrderDetail = function(){
        $scope.displayOrderDetailFlag = !$scope.displayOrderDetailFlag;
    };

});
