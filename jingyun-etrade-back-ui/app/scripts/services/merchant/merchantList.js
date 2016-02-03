'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('MerchantListService', function($http,$location,$resource,ApiService){
	   //根据条件查询商家列表
       this.queryMerchantList = function(name,offset,size){
            return $http.get(ApiService.api.merchant.queryMerchantList, 
                {params:{'merchantName':name,'offset':offset,'size':size}})
       }; 
      /* this.up = function(){
        return $resource(ApiService.api.goods.up, {});
       };
       this.down = function(){
        return $resource(ApiService.api.goods.down, {});
       };*/
});