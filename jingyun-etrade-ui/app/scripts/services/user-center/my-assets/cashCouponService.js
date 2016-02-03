'use strict';

/**
 *	现金抵用券
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('CashCouponService', function ($http, $location,ApiService){
		
		//未消费的
		this.getUnusedCoupon = function(uid){
			return $http.get(ApiService.api.cashCoupon.unusedCoupon.replace(':uid',uid)) ;
		}

		this.getUnusedCouponAmount = function(uid){
			return $http.get(ApiService.api.cashCoupon.unusedCouponAmount.replace(':uid',uid)) ;
		}

		//已消费的
		this.getConsumedCoupon = function(uid){
			return $http.get(ApiService.api.cashCoupon.consumedCoupon.replace(':uid',uid)) ;
		}

		this.getConsumedCouponAmount = function(uid){
			return $http.get(ApiService.api.cashCoupon.consumedCouponAmount.replace(':uid',uid)) ;
		}


		//已过期的
		this.getOverdueCoupon = function(uid){
			return $http.get(ApiService.api.cashCoupon.overdueCoupon.replace(':uid',uid)) ;
		}

		this.getOverdueCouponAmount = function(uid){
			return $http.get(ApiService.api.cashCoupon.overdueCouponAmount.replace(':uid',uid)) ;
		}

		//可消费的
		this.getUseableCoupon = function(uid){
			return $http.get(ApiService.api.cashCoupon.useableCoupon.replace(':uid',uid)) ;
		}

		this.getUseableCouponAmount = function(uid){
			return $http.get(ApiService.api.cashCoupon.useableCouponAmount.replace(':uid',uid)) ;
		}

		//

		this.activeCashCoupon = function(code){
			return $http.put(ApiService.api.cashCoupon.activeCashCoupon .replace(':code',code) ) ;
		}

		this.canActive = function(code){
			return $http.get(ApiService.api.cashCoupon.canActive.replace(':code',code) ) ;
		}

});