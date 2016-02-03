'use strict';


shopbackApp.service('UserService', function ($http, $location,ApiService ){
	
	//获取登录用户信息
	this.getLoginUser = function(){
		return $http.get(ApiService.api.user.getLoginUser);
	};

	
});