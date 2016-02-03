'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('MyAddCommentController', function ($scope,$stateParams,Dialog,ApiService,UploadService, MyAddCommentService, OrderService, $location) {
 	//只在初始化的时候加载一次；
 	$scope.comments={};

 	$scope.comments.picture=[];
	var ogid = $stateParams.gid;
	
	OrderService.singleGoods(ogid).success(function(data){
	 			
			$scope.goods = data.body;
			var gid=$scope.goods.gid;
			getgetGoodGrades(gid);
			
	 });
	$scope.savecomment = function(comments){
 		MyAddCommentService.savecomment(ogid,comments)
 		.success(function(response){
			if(response.code==200){
				$location.path("/user/center/comment/evaluated");
				
			}else{
				Dialog.alert($scope, response.message);
			};
		});
 	};
 	
 	$scope.setGrade = function(num){
 		$scope.comments.commentGrade = num;
 	};
 	$scope.setService = function(num){
 		$scope.comments.serviceGrade = num;
 	};
 	$scope.setLogistics = function(num){
 		$scope.comments.logisticsGrade = num;
 	};
 	
	var getgetGoodGrades = function(gid){
		MyAddCommentService.getGoodGrade(gid).success(function(data){
					$scope.goodgrade = data.body;
					if($scope.goodgrade==null){
						goodgrade.zongjibie=10;
						goodgrade.personCount=0;
					};

					if($scope.goodgrade.zongjibie==10 || $scope.goodgrade.zongjibie==9){
						$('.fec-left-star').addClass('cur');
					}else if($scope.goodgrade.zongjibie==8 || $scope.goodgrade.zongjibie==7){
						$('.fec-left-star#star5').addClass('cur');
						$('.fec-left-star#star4').addClass('cur');
						$('.fec-left-star#star3').addClass('cur');
						$('.fec-left-star#star2').addClass('cur');
						$('.fec-left-star#star1').removeClass('cur');
					}else if($scope.goodgrade.zongjibie==6 || $scope.goodgrade.zongjibie==5){
						$('.fec-left-star#star5').addClass('cur');
						$('.fec-left-star#star4').addClass('cur');
						$('.fec-left-star#star3').addClass('cur');
						$('.fec-left-star#star2').removeClass('cur');
						$('.fec-left-star#star1').removeClass('cur');
					}else if($scope.goodgrade.zongjibie==4 || $scope.goodgrade.zongjibie==3){
						$('.fec-left-star#star5').addClass('cur');
						$('.fec-left-star#star4').addClass('cur');
						$('.fec-left-star#star3').removeClass('cur');
						$('.fec-left-star#star2').removeClass('cur');
						$('.fec-left-star#star1').removeClass('cur');
					}else if($scope.goodgrade.zongjibie==2 || $scope.goodgrade.zongjibie==1){
						$('.fec-left-star#star5').addClass('cur');
						$('.fec-left-star#star4').removeClass('cur');
						$('.fec-left-star#star3').removeClass('cur');
						$('.fec-left-star#star2').removeClass('cur');
						$('.fec-left-star#star1').removeClass('cur');
					}else{
						$('.fec-left-star').removeClass('cur');
					};
					
		});
	};
	$scope.deleteImg = function(imgPath){
 		  $scope.comments.picture.splice($scope.comments.picture.indexOf(imgPath), 1);

 	};
	$scope.uploadFile = function(){
		var form = document.getElementById("fileinfo1");  
		var fd = new FormData(form); 
		var file=document.getElementById("file1");
		var fileName = file.value;
		 UploadService.single(file)
            .success(function(data){
            	if(data.ok){
            		 $scope.comments.picture.push(data.body);
            	}else{
            		 Dialog.alert($scope, data.message);
            	}
              
            }).error(function(data){
                Dialog.alert($scope, "服务异常！请重试");
            });
		
	};
	
 });