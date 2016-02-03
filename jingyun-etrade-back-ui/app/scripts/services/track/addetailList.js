'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('AddetailListService', function($http,$location,$resource,ApiService){
	   //根据条件查询
       this.queryAddetailList = function(name,adModuleId,offset,size){
            return $http.get(ApiService.api.track.queryAddetailList, 
                {params:{'name':name,'adModuleId':adModuleId,'offset':offset,'size':size}});
       }; 
       this.removeAddetail = function(id){
        return $http.delete(ApiService.api.track.removeAddetail.replace(':id', id));
       };
});