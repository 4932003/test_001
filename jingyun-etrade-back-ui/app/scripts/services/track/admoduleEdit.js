'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('AdmoduleEditService', function($http,$location,$state,$resource,ApiService){
       //根据ID查询广告模块信息
       this.getAdmoduleInfo = function(id){
            return $http.get(ApiService.api.track.getAdmoduleInfo.replace(":id",id))
       }; 
       this.updateAdmodule = function (obj){
                    $http.post(ApiService.api.track.updateAdmodule,
                        obj,
                        {'Content-Type': 'application/json;charset=UTF-8'})
                        .success(function(response){
                            if(response.code==200){
                                alert("修改广告模块成功......");
                                $state.go('station-goods.admodule-list');
                            }else{
                                alert("修改广告模块异常....."+response.message);
                            }
                        }).error(function(response){
                            alert("修改广告模块失败:"+response);
                        });
        };
        this.saveAdmodule = function (obj){
                    $http.post(ApiService.api.track.saveAdmodule,
                        obj,
                        {'Content-Type': 'application/json;charset=UTF-8'})
                        .success(function(response){
                            if(response.code==200){
                                alert("保存广告模块成功......");
                                $state.go('station-goods.admodule-list');
                            }else{
                                alert("保存广告模块异常....."+response.message);
                            }
                        }).error(function(response){
                            alert("保存广告模块失败:"+response);
                        });
        };
});