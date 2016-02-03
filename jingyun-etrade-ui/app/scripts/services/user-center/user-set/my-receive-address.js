'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 */
shopApp.service('MyReceiveAddressService', function ($http, $location , ApiService) {
   
    //查询
    this.list = function(uid, offset, size){
        return $http.get(ApiService.api.myReceieveAddress.list.replace(':uid',uid).replace(':offset',offset).replace(':size',size));
    };

    //查询
    this.listAll = function(){
        return $http.get(ApiService.api.myReceieveAddress.listAll);
    };

    //查询详情
    this.single = function(id){
        return $http.get(ApiService.api.myReceieveAddress.single.replace(':id',id));
    }

    //add
    this.add = function(address){
        return $http.post(ApiService.api.myReceieveAddress.add+'/' ,address);
    }

    //refresh
    this.refresh = function(address){
        return $http.put(ApiService.api.myReceieveAddress.refresh.replace(':id',address.id) ,address);
    }

    //remove
    this.remove = function(id){
        return $http.delete(ApiService.api.myReceieveAddress.remove.replace(':id',id));
    }

    this.setDefault = function(id){
        return $http.put(ApiService.api.myReceieveAddress.setDefault.replace(':id',id) , true);
    }

    //cancelDefault
    this.cancelDefault = function(id){
        return $http.put(ApiService.api.myReceieveAddress.setDefault.replace(':id',id) , false);
    }
    
});
