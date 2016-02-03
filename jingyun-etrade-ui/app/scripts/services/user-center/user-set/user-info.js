'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.service('UserinfoService', function ($http, $location,ApiService) {
 	this.getUserinfo = function(){
 		return $http.get(ApiService.api.userinfos.listuserinfo);

 	};
 	this.saveUserinfo = function(userinfo){
 		return $http.put(ApiService.api.userinfos.updateuserinfo,userinfo,{'Content-Type': 'application/json;charset=UTF-8'});
 	};
 });