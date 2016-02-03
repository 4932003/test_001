'use strict';
/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('MyCommentService' , function( $http, $location, ApiService){
     this.getNoCommentCount = function(){
    	 return $http.get(ApiService.api.comments.getnocommentcount);
     }
      this.getCommentCount = function(){
    	 return $http.get(ApiService.api.comments.getcommentcount);
     }

});