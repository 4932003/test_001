'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('UpdateInfoService', function ($http, $location, ApiService) {
	this.getInfobyId = function(id){
		return $http.get(ApiService.api.getinformation.getInfoById.replace(':id',id));
	};
	this.updateInfo = function(infoschool){
		return $http.post(ApiService.api.getinformation.updateInfo,infoschool);
	};
});