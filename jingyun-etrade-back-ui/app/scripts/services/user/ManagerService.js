'use strict';


shopbackApp.service('ManagerService', function ($http, $location,ApiService ){
	
	//获取登录用户信息
	this.current = function(){
		return $http.get(ApiService.api.manager.current);
	};

	
});