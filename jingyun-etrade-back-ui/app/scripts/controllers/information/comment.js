'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('CommentController', function ($scope,ApiService, CommentService){
	CommentService.queryComment().success(function(data){
		$scope.allComment=data.body;
	});
});