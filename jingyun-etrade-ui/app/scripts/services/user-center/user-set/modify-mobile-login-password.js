'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('ModifyLoginPasswordService', function ($http, $location,ApiService) {
	this.listUser = function(){
		return $http.get(ApiService.api.usercenters.gets);
	};

	this.getcode = function(){
		return $http.get(ApiService.api.usercenters.sendmessage,{'Content-Type': 'application/json;charset=UTF-8'});
	};

	this.submits = function(user){
		return $http.get(ApiService.api.usercenters.checkmessage+'?code='+user.code,{'Content-Type': 'application/json;charset=UTF-8'});	
	};

	this.tijiao = function(user){
		return $http.put(ApiService.api.usercenters.update,getSubmitUser(user),{'Content-Type': 'application/json;charset=UTF-8'});	
	};
	//将登录密码加密
	var getSubmitUser = function(user){
		var userSubmit = {
			password: md5(user.password)
		};
		return userSubmit;
	};
});