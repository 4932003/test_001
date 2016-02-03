'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
  shopApp.service('InformationService', function ($http, $location , ApiService) {
  /*	this.querybysiteid = function(siteid){
  		return $http.get(ApiService.api.information.querysite.replace(':siteid',siteid));
  	}*/
 	this.querybysid = function(sid,from,size){
 		return $http.get(ApiService.api.information.querydetails+'?sid='+sid+'&from='+from+'&size='+size);
 	};
 	this.queryAnydetail = function(sid){
 		return $http.get(ApiService.api.information.queryanydetail+'?sid='+sid);
 	};
 	this.querySiteDetail=function(informationID,from,size){
 		return $http.get(ApiService.api.information.querysitedetail+'?informationID='+informationID+'&from='+from+'&size='+size);
 	}
 });