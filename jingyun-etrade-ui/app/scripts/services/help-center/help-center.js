'use strict';
/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('HelpCenterDetailService' , function($http, $location, ApiService){

	//列表展示
	this.list = function(categoryID){
		return $http.get(ApiService.api.helpCenter.detail.list.replace(":categoryID",categoryID));
	};

	this.single = function(id){
		return $http.get(ApiService.api.helpCenter.detail.single.replace(':id',id));
	};

	//getFirstDetailByCategory
	this.getFirstDetailByCategory = function(categoryID){
		return $http.get(ApiService.api.helpCenter.detail.getFirstDetailByCategory.replace(':categoryID',categoryID));
	};
	
});