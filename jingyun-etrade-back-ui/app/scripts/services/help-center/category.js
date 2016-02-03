'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('HelpCenterCategoryService', function ($http, $location, ApiService) {

	//列表展示
	this.list = function(){
		return $http.get(ApiService.api.helpCenter.category.list);
	};

	this.single = function(id){
		return $http.get(ApiService.api.helpCenter.category.single.replace(':id',id));
	};

	this.save = function(category){
		return $http.post(ApiService.api.helpCenter.category.save, category);
	};

	this.refresh = function(category){
		return $http.put(ApiService.api.helpCenter.category.refresh.replace(':id',category.id), category);
	};

	this.remove = function(id){
		return $http.delete(ApiService.api.helpCenter.category.remove.replace(':id',id));
	};


});