'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('SetEmailpwdService', function ($http, $location,ApiService){
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