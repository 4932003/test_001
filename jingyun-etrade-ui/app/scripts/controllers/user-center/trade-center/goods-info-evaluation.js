'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('GoodInfoController', function ($scope, $state,GoodInfoService,GoodsService, $location) {
 	GoodInfoService.getOrders().success(function(data){
 		$scope.ordergoods = data.body;
 	});

 	GoodInfoService.querycommentgoods().success(function(data){
 		$scope.commentGoods=data.body;
 	});
 	$scope.savecomment = function(good){
	 	$state.go('fill-evaluation',{gid:good.id});
 	};

 	$scope.queryComment = function(goods){
 		goods.detailDiv = !goods.detailDiv;
	 	GoodInfoService.queryCommentDetial(goods).success(function(data){
	 		if(data.body!=null){
	 			goods.commentdetail = data.body;

	 			if(goods.commentdetail.personalGrade==2 ||goods.commentdetail.personalGrade==1){
	 				goods.commentdetail.showhide1 = !goods.commentdetail.showhide1;
	 			}
	 			if(goods.commentdetail.personalGrade==4 ||goods.commentdetail.personalGrade==3){
	 				goods.commentdetail.showhide1 = !goods.commentdetail.showhide1;
	 				goods.commentdetail.showhide2 = !goods.commentdetail.showhide2;
	 			}
	 			if(goods.commentdetail.personalGrade==6 ||goods.commentdetail.personalGrade==5){
	 				goods.commentdetail.showhide1 =!goods.commentdetail.showhide1;
	 				goods.commentdetail.showhide2 =!goods.commentdetail.showhide2;
	 				goods.commentdetail.showhide3 =!goods.commentdetail.showhide3;
	 			}
	 			 if(goods.commentdetail.personalGrade==8 ||goods.commentdetail.personalGrade==7){
	 				goods.commentdetail.showhide1 =!goods.commentdetail.showhide1;
	 				goods.commentdetail.showhide2 =!goods.commentdetail.showhide2;
	 				goods.commentdetail.showhide3 =!goods.commentdetail.showhide3;
	 				goods.commentdetail.showhide4 =!goods.commentdetail.showhide4;
	 			}
	 			if(goods.commentdetail.personalGrade==9 ||goods.commentdetail.personalGrade==10){
	 				goods.commentdetail.showhide1 =!goods.commentdetail.showhide1;
	 				goods.commentdetail.showhide2 =!goods.commentdetail.showhide2;
	 				goods.commentdetail.showhide3 =!goods.commentdetail.showhide3;
	 				goods.commentdetail.showhide4 =!goods.commentdetail.showhide4;
	 				goods.commentdetail.showhide5 =!goods.commentdetail.showhide5;
	 			};
	 		};
	 	});
 	};
 	
 	$scope.picture = 0;
 	$scope.getBigPicture = function(imgpath){
 		if(imgpath!=null){
			if(imgpath.picture!=$scope.picture){
					$scope.comment_ID=imgpath.commentID;
					$scope.picture=imgpath.picture;	
			}else{
					$scope.comment_ID =0;
					$scope.picture=0;	
			};
 		};	
 	};


 });