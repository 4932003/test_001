'use strict';
/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('HelpCenterCategoryService' , function($http, $location, ApiService){

	//列表展示
	this.list = function(){
		return $http.get(ApiService.api.helpCenter.category.list);
	};



	//列表展示
	this.listPage = function(offset, size){
		return $http.get(ApiService.api.helpCenter.category.listPage.replace(':offset', offset).replace(':size',size ));
	};

});