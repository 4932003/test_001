'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
  shopApp.controller('MyCommentController', function ($scope, MyCommentService) {
  		MyCommentService.getNoCommentCount().success(function(data){
  			$scope.nocommentcount = data.body;
 			/*console.log($scope.nocommentcount.noCommentCount);*/
  		});
  		MyCommentService.getCommentCount().success(function(data){
  			$scope.commentcount = data.body;
 			/*console.log($scope.commentcount.CommentCount);*/
  		});
  });