'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('PayService', function ($http, $location, ApiService) {
    this.init = function(oids){
        return $http.get(ApiService.api.pay.list, 
                    {'params':{'oid': oids}});
    };
    this.getPayInfo = function(payrequestvo){
        return $http.put(ApiService.api.pay.platforminfo, payrequestvo, {'headers':{'Content-Type':'application/json;charset=UTF-8'}});
    };
});