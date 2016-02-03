'use strict';
/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('MyAddCommentService' , function($http, $location, ApiService){

	this.savecomment = function(ogid,comments){
		return $http.post(ApiService.api.comments.savecomments+'?ogid='+ogid,comments,{'Content-Type': 'application/json;charset=UTF-8'});
	};
	this.getGoodGrade = function(gid){
		return $http.get(ApiService.api.comments.getgoodgrade+'?gid='+gid);
	};
});