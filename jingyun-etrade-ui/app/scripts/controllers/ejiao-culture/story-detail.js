'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('StoryDetailController', function ($scope,$stateParams, $http,StoryDetailService,$sce){
 	var id=$stateParams.id;
 	StoryDetailService.querybyid(id).success(function(data){
 		$scope.storyDetail=data.body;
 		$scope.storyContent = $sce.trustAsHtml(data.body.content);
	});
 });