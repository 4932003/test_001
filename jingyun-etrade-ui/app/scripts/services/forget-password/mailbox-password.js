'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('EmailpwdsService', function ($http, $location,ApiService) {
	this.emailcode = function(email){
		return 	$http.get(ApiService.api.usercenters.eamilforgetpwd+'?key='+email,{'Content-Type': 'application/json;charset=UTF-8'});	
	};
	this.emailcheck = function(code){
		return $http.get(ApiService.api.usercenters.checkemail+'?code='+code,{'Content-Type': 'application/json;charset=UTF-8'});	
	};
	this.forgetpwds = function(email,password){
		return 	$http.put(ApiService.api.usercenters.updatepwd+'?key='+email+'&password='+md5(password),{'Content-Type': 'application/json;charset=UTF-8'});	
	};
});