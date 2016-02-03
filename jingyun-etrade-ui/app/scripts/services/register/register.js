'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('RegisterService' , function($http, $location, ApiService){

	this.register = function(user){
		return $http.put(ApiService.api.user.registersave,getSubmitUser(user),{'Content-Type': 'application/json;charset=UTF-8'}); 	
	};
	this.emailcode = function(user){
		return $http.get(ApiService.api.user.emailsend+'?email='+user.email,{'Content-Type': 'application/json;charset=UTF-8'});
	};
	this.mobilecode = function(user){
		return $http.get(ApiService.api.user.mobilesend+'?mobile='+user.mobile,{'Content-Type': 'application/json;charset=UTF-8'});
			
	};

	//将登陆密码加密
	var getSubmitUser = function(user){
		var userSubmit = {
			code: user.code,
			mobile: user.mobile,
			email: user.email,
			password: md5(user.password),
			username: user.username
		};
		return userSubmit;
	}

});