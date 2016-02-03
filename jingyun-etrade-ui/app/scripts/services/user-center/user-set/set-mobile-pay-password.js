'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('SetPaypwdService', function ($http, $location,ApiService){
	this.listUser = function(){
		return $http.get(ApiService.api.usercenters.gets);
	};
	
	this.checkcodes = function(user){
		return $http.get(ApiService.api.usercenters.checkmessage+'?code='+user.code,{'Content-Type': 'application/json;charset=UTF-8'});
		
	};
	this.tijiao = function(user){
		return $http.put(ApiService.api.usercenters.installpay,getSubmitUser(user),{'Content-Type': 'application/json;charset=UTF-8'});	
	};
	//将登录密码加密
	var getSubmitUser = function(user){
		var userSubmit = {
			tradepwd: md5(user.tradepwd)
		};
		return userSubmit;
	};
});