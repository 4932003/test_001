'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl liug
 * Controller of the jingyunshopApp
 */
shopApp.service('GoodsadService', function ($http, $location,ApiService) {
    this.listHot24Goods = function(){
        return $http.get(ApiService.api.goodsad.listHot24Goods);
    };
    this.listHoneyGoods = function(gid){
        return $http.get(ApiService.api.goodsad.listHoneyGoods+gid);
    };
});
