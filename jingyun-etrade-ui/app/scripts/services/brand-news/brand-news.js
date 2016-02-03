'use strict';


shopApp.service('BrandNewsService', function ($http, $location,ApiService){

	this.querynewsbysid = function(sid,from,size){
 		return $http.get(ApiService.api.information.querydetails+'?sid='+sid+'&from='+from+'&size='+size);
 	};
 	this.queryAnynewsdetail = function(sid){
 		return $http.get(ApiService.api.information.queryanydetail+'?sid='+sid);
 	};
});