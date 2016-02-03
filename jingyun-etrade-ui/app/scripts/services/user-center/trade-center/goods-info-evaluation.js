'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('GoodInfoService' , function( $http, $location, ApiService){
	this.getOrders = function(){
		return 	$http.get(ApiService.api.comments.queryorders);
	};
	this.querycommentgoods = function(){
		return 	$http.get(ApiService.api.comments.querycommentgoods);
	};
	this.queryCommentDetial = function(goods){
		return $http.get(ApiService.api.comments.getcommentdetail.replace(':oid',goods.oid).replace(':gid',goods.gid));
	};

});