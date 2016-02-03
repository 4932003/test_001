'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('RefundListController', function ($scope, $state, ConstantService, RefundService, RefundStatusService, $stateParams, $cookies, $q) {
    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    if(!loginuid){
        $("#login-dialog").modal("show");
        return;
    }
    RefundService.listWithCondition(loginuid, ''/**all*/, '', '', 0, 10)
        .success(function(data){
            if(data.ok){
                $scope.refunds = data.body;
            }
        }).error(function(data){

        });
});
