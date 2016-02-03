'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl liug
 * Controller of the jingyunshopApp
 */
shopApp.service('TrackService', function ($http, $location,$resource,ApiService) {
    this.collectGoods = function(id){ 
    	var collect = $resource(ApiService.api.track.collectGoods, {});
    	return collect;
    };
    this.saveFootprintGoods = function(id){
        var save = $resource(ApiService.api.track.saveFootprintGoods, {});
         save.get({gid:id},  function(data){
                var rlt = data.message;
                }, 
            function(data){
                var rlt = data.message;
                });
    };
    this.listgoodsfavorites1 = function(){
        return $resource(ApiService.api.track.listgoodsfavorites, {});
    };
    this.listfootprintgoods1 = function(){
        return $resource(ApiService.api.track.listfootprintgoods, {});
    };
    this.listgoodsfavorites2 = function(){
        return $resource(ApiService.api.track.listgoodsfavorites, {});
    };
    this.listfootprintgoods2 = function(){
        return $resource(ApiService.api.track.listfootprintgoods, {});
    };
    this.listgoodsfavorites3 = function(){
        return $resource(ApiService.api.track.listgoodsfavorites, {});
    };
    this.removefavorites = function(id){
        return $http.delete(ApiService.api.track.removefavorites.replace(':id', id));
    };
    this.listmerchantfavorites = function(){
        return $resource(ApiService.api.track.listmerchantfavorites, {});
    };
    this.listAdDetails = function(){
        return $resource(ApiService.api.track.listAdDetails, {});
    };
    this.recommendGoodslist= function(){
        return $resource(ApiService.api.track.recommendGoodslist,{});
    };
    this.otherGoodslist= function(){
        return $resource(ApiService.api.track.otherGoodslist,{});
    }
});
