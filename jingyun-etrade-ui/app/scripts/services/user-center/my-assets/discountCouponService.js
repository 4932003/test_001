'use strict';

/**
 * 折扣券
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('DiscountCouponService', function ($http, $location,ApiService){
	
		//未消费的
		this.getUnusedCoupon = function(uid){
			return $http.get(ApiService.api.discountCoupon.unusedCoupon.replace(':uid',uid)) ;
		}

		this.getUnusedCouponAmount = function(uid){
			return $http.get(ApiService.api.discountCoupon.unusedCouponAmount.replace(':uid',uid)) ;
		}

		//已消费的
		this.getConsumedCoupon = function(uid){
			return $http.get(ApiService.api.discountCoupon.consumedCoupon.replace(':uid',uid)) ;
		}

		this.getConsumedCouponAmount = function(uid){
			return $http.get(ApiService.api.discountCoupon.consumedCouponAmount.replace(':uid',uid)) ;
		}


		//已过期的
		this.getOverdueCoupon = function(uid){
			return $http.get(ApiService.api.discountCoupon.overdueCoupon.replace(':uid',uid)) ;
		}

		this.getOverdueCouponAmount = function(uid){
			return $http.get(ApiService.api.discountCoupon.overdueCouponAmount.replace(':uid',uid)) ;
		}

		//可消费的
		this.getUseableCoupon = function(uid){
			return $http.get(ApiService.api.discountCoupon.useableCoupon.replace(':uid',uid)) ;
		}

		//激活
		this.activeDiscountCoupon = function(code){
			return $http.put(ApiService.api.discountCoupon.activeDiscountCoupon.replace(':code',code)) ;
		}

		this.canActive = function(code){
			return $http.get(ApiService.api.discountCoupon.canActive.replace(':code',code) ) ;
		}


});