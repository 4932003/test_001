'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('RefundService', function ($http, $location, ApiService) {
   this.listWithCondition  = function (mid, from, size, status){
        return  $http.get(ApiService.api.refund.listWithCondition,
                    {'params': {'status':status, 'mid': mid, 'from':from, 'size':size}});
    };

    this.accept = function(rid, note){
    	return $http.post(ApiService.api.refund.accept, $.param({'rid':rid, 'note':note}),
    				{'headers':{'Content-Type':'application/x-www-form-urlencoded'}});
    };

    this.deny = function(rid, note){
    	return $http.post(ApiService.api.refund.deny, $.param({'rid':rid, 'note':note}),
    				{'headers':{'Content-Type':'application/x-www-form-urlencoded'}});
    };

    this.done = function(rid, note){
        return $http.post(ApiService.api.refund.done, $.param({'rid':rid}),
                    {'headers':{'Content-Type':'application/x-www-form-urlencoded'}});
    };

});