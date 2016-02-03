'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('MerchantEditService', function($http,$location,$state,$resource,ApiService){
	   //根据ID查询商家信息
       this.getMerchantInfo = function(mid){
            return $http.get(ApiService.api.merchant.getMerchantInfo.replace(":mid", mid))
       }; 
       this.updateMerchant = function (m){
                    $http.post(ApiService.api.merchant.update,
                        m,
                        {'Content-Type': 'application/json;charset=UTF-8'})
                        .success(function(response){
                            if(response.code==200){
                                alert("修改商家成功......");
                                $state.go('station-goods.merchant-list');
                            }else{
                                alert("修改商家异常....."+response.message);
                            }
                        }).error(function(response){
                            alert("修改商家失败:"+response);
                        });
        };
        this.saveMerchant = function (m){
                    $http.post(ApiService.api.merchant.save,
                        m,
                        {'Content-Type': 'application/json;charset=UTF-8'})
                        .success(function(response){
                            if(response.code==200){
                                alert("保存商家成功......");
                                $state.go('station-goods.merchant-list');
                            }else{
                                alert("保存商家异常....."+response.message);
                            }
                        }).error(function(response){
                            alert("保存商家失败:"+response);
                        });
        };
         this.invoicelist = function(){
            return $resource(ApiService.api.merchant.invoicelist, {});
        };
         this.deliverylist = function(){
            return $resource(ApiService.api.merchant.deliverylist, {});
        };
});