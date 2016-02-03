'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('MyAccountService', function ($http, $location,ApiService){
	
	//用户未使用的有效购物金和抵用券总数
	this.getUnusedCouponAmount = function(uid){
		return $http.get(ApiService.api.user.getUnusedCouponAmount.replace(':uid', uid)) ;
	}

});