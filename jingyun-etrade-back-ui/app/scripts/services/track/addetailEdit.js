'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('AddetailEditService', function($http,$location,$state,$resource,ApiService){
	   //根据ID查询广告信息
       this.getAddetailInfo = function(id){
            return $http.get(ApiService.api.track.getAddetailInfo.replace(":id",id))
       }; 
       this.updateAddetail = function (obj){
                    $http.post(ApiService.api.track.updateAddetail,
                        obj,
                        {'Content-Type': 'application/json;charset=UTF-8'})
                        .success(function(response){
                            if(response.code==200){
                                alert("修改广告成功......");
                                $state.go('station-goods.addetail-list');
                            }else{
                                alert("修改广告异常....."+response.message);
                            }
                        }).error(function(response){
                            alert("修改广告失败:"+response);
                        });
        };
        this.saveAddetail = function (obj){
                    $http.post(ApiService.api.track.saveAddetail,
                        obj,
                        {'Content-Type': 'application/json;charset=UTF-8'})
                        .success(function(response){
                            if(response.code==200){
                                alert("保存广告成功......");
                                $state.go('station-goods.addetail-list');
                            }else{
                                alert("保存广告异常....."+response.message);
                            }
                        }).error(function(response){
                            alert("保存广告失败:"+response);
                        });
        };
        this.admodulelist  = function (){
            return  $http.get(ApiService.api.track.admodulelist,
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
            };
});