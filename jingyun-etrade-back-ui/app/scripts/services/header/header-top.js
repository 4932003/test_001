'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('HeaderTopService', function ($http, $location , ApiService) {
    
   

     this.logout = function(){
        return $http.get(ApiService.api.logout);
    };

   
})