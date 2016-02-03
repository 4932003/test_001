'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('ModifyEmailPaypeddService', function ($http, $location,ApiService){
	this.submits = function(user){

		return $http.put(ApiService.api.usercenters.updatepaypwd,getSubmitUser(user),{'Content-Type': 'application/json;charset=UTF-8'});		
	};
	//将支付密码加密
	var getSubmitUser = function(user){
		var userSubmit = {
			tradepwd: md5(user.tradepwd)
		};
		return userSubmit;
	};
	
});