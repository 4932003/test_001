'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
  shopApp.service('StoryDetailService', function ($http, $location , ApiService) {
  	this.querybyid = function(id){
 		return $http.get(ApiService.api.information.querydetail.replace(':id',id));
 	};
  });