'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('DiscountcounponService', function ($http, $location, ApiService) {

	//新增
	this.save = function(discountcounpon, amount){
		return $http.post(ApiService.api.counpon.discountcounpon.save.replace(':amount', amount),discountcounpon);

	}

	//查询
	this.list = function(discountcounpon, from, size){
		return $http.get(ApiService.api.counpon.discountcounpon.list.replace(':from', from).replace(':size', size)
			,{params:{"cardNum": discountcounpon.cardNum , "value":discountcounpon.value ,"locked": discountcounpon.locked }});
	}
	//解锁
	this.unlock = function(ids){
		return $http.put(ApiService.api.counpon.discountcounpon.unlock.replace(":ids",ids));
	}

	//查询
	this.count = function(discountcounpon){
		return $http.get(ApiService.api.counpon.discountcounpon.count
			,{params:{"cardNum": discountcounpon.cardNum , "value":discountcounpon.value ,"locked": discountcounpon.locked }});
	}

});