'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('AdmoduleListService', function($http,$location,$resource,ApiService){
	   //根据条件查询
       this.queryAdmoduleList = function(name,offset,size){
            return $http.get(ApiService.api.track.queryAdmoduleList, 
                {params:{'name':name,'offset':offset,'size':size}});
       }; 
       this.removeAdmodule = function(id){
        return $http.delete(ApiService.api.track.removeAdmodule.replace(':id', id));
       };
});