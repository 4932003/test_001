'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('ModifyMobileService', function ($http, $location,ApiService) {

	this.listUser = function(){
		return $http.get(ApiService.api.usercenters.gets);
	};

	/*this.getcode = function(){
		return $http.get(ApiService.api.usercenters.sendmessage,{'Content-Type': 'application/json;charset=UTF-8'});
		 
	};
	this.submits = function(code){

		 $http.get(ApiService.api.usercenters.checkmessage+'?code='+code,{'Content-Type': 'application/json;charset=UTF-8'})
			.success(function(response){
			if(response.code==200){
				changeHd(2);
		        changeBd(2);
			}else{
				alert("fails "+response.message);
			}
		})
		.error(function(response){
			alert("code fails"+response);
		});
		 
		 	
	};
	this.sendcode = function(mobiles){
		return $http.get(ApiService.api.usercenters.sendmobile+'?mobile='+mobiles,{'Content-Type': 'application/json;charset=UTF-8'});
	};*/
	this.checkcode = function(mobiles,codes){
		return $http.put(ApiService.api.usercenters.updatemobile+'?mobile='+mobiles+'&code='+codes,{'Content-Type': 'application/json;charset=UTF-8'});
	};

});