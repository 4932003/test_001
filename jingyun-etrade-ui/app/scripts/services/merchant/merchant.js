'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl liug
 * Controller of the jingyunshopApp
 */
shopApp.service('MerchantService', function ($http,$state,$location,$resource,ApiService) {
    this.listRecommendMerchant = function(){
        return $http.get(ApiService.api.merchant.listRecommendMerchant);
    };
    this.listHotGoods = function(){
        return $http.get(ApiService.api.merchant.listHotGoods);
    };
    this.collectMerchant = function(){
    	var collect = $resource(ApiService.api.merchant.collectMerchant, {});
    	return collect;
    };
});
