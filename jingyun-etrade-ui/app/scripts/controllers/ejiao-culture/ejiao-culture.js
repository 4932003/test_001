'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('InformationController', function ($scope,$state,$http,InformationService,StoryDetailService,GoodsService){
 
 	//查出阿胶历史
 	InformationService.querybysid('fNC2K5iSR4Gg6b5j2vXurA',0,3).success(function(data){
 		$scope.historyDetails=data.body;
 	});
 	//名医古方
 	InformationService.querybysid('XVRizGWdQhiyVhmyn4cUpg',0,3).success(function(data){
 		$scope.oldDetails=data.body;
 	});
	//查出阿胶人物事故
	InformationService.queryAnydetail('B_zVBGGoRkqdq1Zvs5tLxw').success(function(data){
 		$scope.storyanyDetails=data.body;
 	});
	StoryDetailService.querybyid('r6UiZa8nSjmXj0GXamQjpQ').success(function(data){
 		 $scope.story1=data.body;
	});
	StoryDetailService.querybyid('MkMQM--BS1G_9HxhM5PtsQ').success(function(data){
 		$scope.story2=data.body;
	});

	StoryDetailService.querybyid('fIiBnCcXTg2qyEw_RwSx_A').success(function(data){
 		$scope.story3=data.body;
	});
 	InformationService.querybysid('GbVNWlxYSEar9oCfJ7OjOg',0,8).success(function(data){
 		$scope.heathlyFood = data.body;
 	});
 	//健康食谱的详情页
 	$scope.heathlyDetail = function(heathly){
		$state.go('ejiao-school-detial',{id:heathly.id});	
 	};

 	//查出每个人物故事的详情
	$scope.storyDetail = function(story1){
		$state.go('story-detail',{id:story1.id});
 	};
 	$scope.story2detail = function(story2){
		$state.go('story-detail',{id:story2.id});	
 	};
 	$scope.story3detail = function(story3){
		$state.go('story-detail',{id:story3.id});
 	};
 	$scope.historyDetail = function(datails){
 		$state.go('history-detail',{id:datails.id});
 	};
 	$scope.drugDetail = function(old){
 		$state.go('medical-prescription-detail',{id:old.id});
 	};

 	//查出阿胶的古方医药
 	InformationService.queryAnydetail('XVRizGWdQhiyVhmyn4cUpg').success(function(data){
 		$scope.drugAnyDetails=data.body;
 	});
 	InformationService.querybysid('XVRizGWdQhiyVhmyn4cUpg',0,3).success(function(data){
 		$scope.drugDetails=data.body;
 	});
 	//查出阿胶工艺
 	InformationService.querybysid('cL03hkZcRZWNG0fXrlYj6A',0,3).success(function(data){
 		$scope.artsDetails=data.body;
 	});

 });