'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('HelpCenterDetailService', function ($http, $location, ApiService) {

	//列表展示
	this.list = function(categoryID){
		return $http.get(ApiService.api.helpCenter.detail.list.replace(":categoryID",categoryID));
	};

	this.single = function(id){
		return $http.get(ApiService.api.helpCenter.detail.single.replace(':id',id));
	};

	this.save = function(detail){
		return $http.post(ApiService.api.helpCenter.detail.save, detail);
	};

	this.refresh = function(detail){
		return $http.put(ApiService.api.helpCenter.detail.refresh.replace(':id',detail.id), detail);
	};

	this.remove = function(id){
		return $http.delete(ApiService.api.helpCenter.detail.remove.replace(':id',id));
	};
});