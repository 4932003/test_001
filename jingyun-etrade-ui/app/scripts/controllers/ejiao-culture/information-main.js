'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('InfoMainController', function ($scope,$state,$http,InfoMainService){
 	
 	InfoMainService.querySiteDetail('101',0,8).success(function(data){
 		$scope.schoolss=data.body;	
 	});
 	InfoMainService.querybysid('1Dpepbs9SSuHgoLKWgH9-w',0,8).success(function(data){
 		$scope.stations=data.body;
 	});
 	$scope.school = function(){
 		InfoMainService.querySiteDetail('101',0,8).success(function(data){
 			$scope.schoolss=data.body;
 		});
 	};
 	$scope.wenhua=function(){
 		InfoMainService.querySiteDetail('102',0,8).success(function(data){
 			$scope.schoolss=data.body;
 		});
 	};
 	$scope.xuexiao = function(schools){
 		if(schools.id=="GbVNWlxYSEar9oCfJ7OjOg"){
 			$state.go('ejiao-school-detial',{id:schools.did});
 		};
 		if(schools.id=="B_zVBGGoRkqdq1Zvs5tLxw"){
 			$state.go('story-detail',{id:schools.did});
 		};
 		if(schools.id=="fNC2K5iSR4Gg6b5j2vXurA"){
 			$state.go('history-detail',{id:schools.did});
 		};
 		if(schools.id=="XVRizGWdQhiyVhmyn4cUpg"){
 			$state.go('medical-prescription-detail',{id:schools.did});
 		};
 	};
 	$scope.statusDetail = function(station){
 		$state.go('brand-news-others-detail',{id:station.id});
 	};
 	$scope.station=function(){
	 	InfoMainService.querybysid('1Dpepbs9SSuHgoLKWgH9-w',0,8).success(function(data){
 			$scope.stations=data.body;
 		});
	};
	$scope.inner = function(){
 	 	InfoMainService.querybysid('BPlCmjhmRZ6YjetNiyQtwA',0,8).success(function(data){
 			$scope.stations=data.body;
 		});
 	 };
	 
 });