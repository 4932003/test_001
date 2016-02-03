'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('ModifyEmailPasswordService', function ($http, $location,ApiService){
	this.listUser = function(){
		return $http.get(ApiService.api.usercenters.gets);
	};
	this.getcodes = function(){
	   return $http.get(ApiService.api.usercenters.sendusermessage,{'Content-Type': 'application/json;charset=UTF-8'});
		
	};
	this.checkemail = function(code){
		return $http.get(ApiService.api.usercenters.checkemail+'?code='+code,{'Content-Type': 'application/json;charset=UTF-8'});
			
	};

	this.tjsuccess = function(user){
		return $http.put(ApiService.api.usercenters.update,getSubmitUser(user),{'Content-Type': 'application/json;charset=UTF-8'});	
	};
	//将登陆密码加密
	var getSubmitUser = function(user){
		var userSubmit = {
			password: md5(user.password)
		};
		return userSubmit;
	};
});