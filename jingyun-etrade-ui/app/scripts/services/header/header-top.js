'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('HeaderTopService', function ($http, $location , ApiService) {
    
    this.getLoginUser = function(){
        return $http.get(ApiService.api.user.getLoginUser);
    };

     this.logout = function(){
        return $http.get(ApiService.api.logout);
    };

    this.cartCount = function(uid){
    	return $http.get(ApiService.api.cart.count.replace(':uid', uid));
    }

})