'use strict';

/**
 *	现金抵用券
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('CouponService', function ($http, $location, ApiService){
		
		this.calculate = function(uid, cid, type, price){
			return $http.get(ApiService.api.coupon.calculation, 
				{"params":{"uid":uid, "cid":cid, "type": type, "price": price}});
		};

});