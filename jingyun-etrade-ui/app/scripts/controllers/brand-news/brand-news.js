'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('BrandNewsController', function ($scope,$state,$http,BrandNewsService,InformationService){
 
 	//品牌故事
 	BrandNewsService.querynewsbysid('eAKP0sHtSB2gWxTGB4w98w',0,4).success(function(data){
 		$scope.newsdetail=data.body;
 	});
 	//站内资讯
 	InformationService.queryAnydetail('1Dpepbs9SSuHgoLKWgH9-w').success(function(data){
 		$scope.infodetail=data.body;
 		$scope.infodetail1=data.body[0];
 		$scope.infodetail2=$scope.infodetail.slice(1,data.body.length);
 	});
 	//行内动态(查看更多)
 	$scope.size = 2;
 	$scope.more = false;
	//列表集合
	$scope.innerdetail = [];
 	$scope.$watch('$viewContentLoaded', function() { 
		 	
		 $scope.getList($scope.size);
		 		
	});
	$scope.getList = function(size){
		 	BrandNewsService.querynewsbysid('BPlCmjhmRZ6YjetNiyQtwA',$scope.innerdetail.length,size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}

		 			for (var i = 0; i < data.body.length; i++) {
		 				$scope.innerdetail.push(data.body[i]);
		 			};
	 			};
				
		 	});
	};
 	
 	$scope.readNews = function(news){
		$state.go('brand-news-story-detail',{id:news.id});
 	};
 	$scope.readInner = function(inner){
		
		$state.go('brand-news-others-detail',{id:inner.id});
 	};
 	$scope.station = function(statuss){
 		$state.go('brand-news-others-detail',{id:statuss.id});
 	};
 });