'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('AreaService', function ($http, $location,ApiService){
	
	this.listCountry = function(){
		return $http.get(ApiService.api.area.listCountry);
	};
	this.listProvince = function(countryID){
		return $http.get(ApiService.api.area.listProvince+'/'+countryID);
	};

     this.listCity = function(provinceID){
		return $http.get(ApiService.api.area.listCity+'/'+provinceID);
	};


});