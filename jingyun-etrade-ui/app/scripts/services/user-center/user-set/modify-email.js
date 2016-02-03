'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('ModifyEmailService', function ($http, $location , ApiService) {
    
    this.refreshEmail= function(email, code){
        return $http.put(ApiService.api.user.refreshEmail+'?email='+email+'&code='+code);
    };
    
});
