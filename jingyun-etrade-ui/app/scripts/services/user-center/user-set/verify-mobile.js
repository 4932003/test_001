'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('VerifyMobileService', function ($http, $location, ApiService) {
    

    this.refreshMobile = function(mobile, code){
        
        return $http.put(ApiService.api.user.refreshMobile+'/?mobile='+mobile+'&code='+code);
    };
});
