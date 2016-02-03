'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('PasswordService', function ($http, $location, ApiService) {

	//新增
	this.refreshPwd = function(pwdVO){
		return $http.put(ApiService.api.refreshPwd, pwdVO);

	}

});