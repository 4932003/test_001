'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('MobilepwdServices' , function( $http, $location, ApiService){

	this.mobilecode = function(mobile){
		return $http.get(ApiService.api.usercenters.forgetpwd+'?key='+mobile,{'Content-Type': 'application/json;charset=UTF-8'})
		
	};
	this.mobilecheck = function(code){
		return $http.get(ApiService.api.usercenters.checkmessage+'?code='+code,{'Content-Type': 'application/json;charset=UTF-8'})
		
	};
	this.foundpwd = function(mobile,password){
		return $http.put(ApiService.api.usercenters.updatepwd+'?key='+mobile+'&password='+md5(password),{'Content-Type': 'application/json;charset=UTF-8'})
		
	};
	
});