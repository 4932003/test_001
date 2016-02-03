'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('RefundDetailController', 
    function ($scope, $state, ConstantService, OrderService, RefundService, RefundStatusService, $stateParams, $cookies, $q, OrderStatusService) {
    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    if(!loginuid){
        $("#login-dialog").modal("show");
        return;
    }
    
    var rid = $stateParams.rid;
    var ogid = $stateParams.ogid;

    if(!rid || !ogid){
    	$state.go("404");
    	return;
    }

    OrderService.singleGoods(ogid)
        .success(function(data){
            $scope.goods = data.body;
        });

    
	RefundService.single(rid)
    	.success(function(data){
    		if(data.ok){
    			$scope.refund = data.body;
    		}
    	}).error(function(data){

    	});
    RefundService.listTraces(rid)
        .success(function(data){
            if(data.ok){
                $scope.traces = data.body;
                $scope.acceptTrace = getTraceByCode(RefundStatusService.ACCEPT_CODE);
                $scope.doneTrace = getTraceByCode(RefundStatusService.DONE_CODE);
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
    RefundService.listCertificates(rid)
        .success(function(data){
            if(data.ok){
                $scope.certificates = data.body;
            }
        }).error(function(data){

        });

    var getTraceByCode = function(code){
        if(!$scope.traces) return ;
        for(var i = 0; i < $scope.traces.length; i++){
            if($scope.traces[i].statusCode == code){
                return $scope.traces[i];
            }
        }
        return;
    };

    $scope.certSelected = function(){
        return $scope.selectedCert != null ;
    };
    $scope.selectCert = function(cert){
        $scope.selectedCert = cert;
    };
    $scope.removeCert = function(){
        $scope.selectedCert = null;
    };
});
