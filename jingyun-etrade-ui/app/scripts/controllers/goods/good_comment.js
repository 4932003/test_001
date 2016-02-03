'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */

shopApp.controller('GoodsCommentController', function ($scope, $state,$stateParams,GoodsService,TrackService, CartService, Dialog){
		//每页数量
		$scope.size = 6;
		//是否显示'展示更多'
		$scope.more = false;
		//列表集合
		$scope.list = [];
		$scope.commentGrade=0;
		$scope.commentGrade1=9;
		$scope.commentGrade2=7;
		$scope.commentGrade3=5;
		$scope.picture=0;
		$scope.picture1=1;

		var gid = $stateParams.gid;
		$scope.$watch('$viewContentLoaded', function() { 
		 		$scope.getList($scope.size,$scope.commentGrade,$scope.picture);
		 });
		 //评价
		 $scope.getList = function(size, commentGrade,picture){
		 	GoodsService.getCommentGrade(gid,commentGrade,picture,$scope.list.length,size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}
		 			for (var i = 0; i < data.body.length; i++) {
		 				data.body[i].userVO.username = getViewUserName(data.body[i].userVO.username);
		 				$scope.list.push(data.body[i]);
		 			};
	 			};
					
		 	});
		};
		var getViewUserName = function(username){
	    	return username.substring(0,1)+"****"+username.substr(username.length-1);
	    };
		$scope.getComment = function(commentGrade){
			$scope.list.length=0;
			GoodsService.getCommentGrade(gid,$scope.commentGrade,$scope.picture,$scope.list.length,$scope.size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==$scope.size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}
		 			for (var i = 0; i < data.body.length; i++) {
		 				data.body[i].userVO.username = getViewUserName(data.body[i].userVO.username);
		 				
		 			};
		 			$scope.list=data.body;
	 			};
					
		 	});
		};	
		$scope.getpicture = function(){
			$scope.list=[];
			GoodsService.getCommentGrade(gid,$scope.commentGrade,$scope.picture1,$scope.list.length,$scope.size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==$scope.size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}
		 			for (var i = 0; i < data.body.length; i++) {
		 				data.body[i].userVO.username = getViewUserName(data.body[i].userVO.username);
		 				
		 			};
		 			$scope.list=data.body;
	 			};
					
		 	});
			
		};

		$scope.goodCommnet = function(commentGrade){
			$scope.list=[];
			GoodsService.getCommentGrade(gid,$scope.commentGrade1,$scope.picture,$scope.list.length,$scope.size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==$scope.size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}
		 			for (var i = 0; i < data.body.length; i++) {
		 				data.body[i].userVO.username = getViewUserName(data.body[i].userVO.username);
		 				
		 			};
		 			$scope.list=data.body;
	 			};
					
		 	});
		};

		$scope.middleCommnet = function(commentGrade){
		 	$scope.list=[];
		 	GoodsService.getCommentGrade(gid,$scope.commentGrade2,$scope.picture,$scope.list.length,$scope.size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==$scope.size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}
		 			for (var i = 0; i < data.body.length; i++) {
		 				data.body[i].userVO.username = getViewUserName(data.body[i].userVO.username);
		 				
		 			};
		 			$scope.list=data.body;
	 			};
					
		 	});
			
		};
		$scope.dadCommnet = function(commentGrade){
		 	$scope.list=[];
		 	GoodsService.getCommentGrade(gid,$scope.commentGrade3,$scope.picture,$scope.list.length,$scope.size).success(function(data){
		 		if(data.code=200){
	 				//是否显示'查看更多'
		 			if(data.body.length==$scope.size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}
		 			for (var i = 0; i < data.body.length; i++) {
		 				data.body[i].userVO.username = getViewUserName(data.body[i].userVO.username);
		 				
		 			};
		 			$scope.list=data.body;
	 			};
					
		 	});
		};
		$scope.pictures=0;
		$scope.getBigPicture = function(imgs){
			if(imgs!=null){
				if(imgs.picture!=$scope.pictures){
					$scope.img_id = imgs.commentID;
					$scope.pictures=imgs.picture;
				}else{
					$scope.img_id =0;
					$scope.pictures=0;
				};
			};
		};
		GoodsService.getOverallGrade(gid).success(function(data){
				$scope.grade = data.body;
				if($scope.grade.level==0){
					$scope.levels=10;
				}else{
					$scope.levels=$scope.grade.level;
				};
				if($scope.grade.levelGrade==0){
					$scope.levelGrades=100;
				}else{
					$scope.levelGrades=$scope.grade.levelGrade;
				};
		});
});