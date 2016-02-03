'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('CommentService', function ($http, $location, ApiService) {
	this.queryComment = function(){
		$http.get(ApiService.api.comment.querycomment);
	};

});