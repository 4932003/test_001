'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
  shopApp.service('InfoMainService', function ($http, $location , ApiService) {
	  	this.querybysid = function(sid,from,size){
	 		return $http.get(ApiService.api.information.querydetails+'?sid='+sid+'&from='+from+'&size='+size);
	 	};

	 	this.querySiteDetail=function(informationID,from,size){
	 		return $http.get(ApiService.api.information.querysitedetail+'?informationID='+informationID+'&from='+from+'&size='+size);
	 	};
  });