'use strict';

/**
 *	现金抵用券
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('PointService', function ($http, $location, ApiService){
		
		this.get = function(uid){
			return $http.get(ApiService.api.point.point.replace(":uid",uid));
		};

});