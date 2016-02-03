'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('RightSidebarController', function ($scope, $http, $cookies, ConstantService, HeaderTopService) {

    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    $scope.gcount = 0;
    HeaderTopService.cartCount(loginuid)
        .success(function(data){
            if(data.code==200){
                $scope.gcount = data.body;
            }
            
        });
})