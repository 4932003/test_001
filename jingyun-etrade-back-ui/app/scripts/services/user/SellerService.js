'use strict';


shopbackApp.service('SellerService', function ($http, $location,ApiService ){
	
	//获取登录用户信息
	this.current = function(){
		return $http.get(ApiService.api.seller.current);
	};

	
});