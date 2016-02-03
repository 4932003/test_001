'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */

shopApp.controller('GoodsDetailController', function ($scope, $state,$stateParams,GoodsService,TrackService, CartService, Dialog){

		//每页数量
		$scope.size = 3;
		//是否显示'展示更多'
		$scope.more = false;
		//列表集合
		$scope.list = [];

		$scope.priceShow = false;
		$scope.addCartShow = false;






		$scope.commentGrade=0;
		$scope.commentGrade1=9;
		$scope.commentGrade2=7;
		$scope.commentGrade3=5;
		$scope.picture=0;
		$scope.picture1=1;

		var gid = $stateParams.gid;
		

		//其他人喜欢商品查询
  		 TrackService.otherGoodslist().get({gid:gid,pfrom:0,pcount:3}, function(data){
              $scope.otherGoodslist = data.body;
           }, 
       	 function(data){
          var rlt = data.message;
          });
		

		//保存我的足迹
		TrackService.saveFootprintGoods(gid);
		//收藏商品
		$scope.collectGoods = function(tid) {
        var collect = TrackService.collectGoods();
	        collect.get({gid:tid},  function(data){
					 if(data.code == '200'){
	                //Dialog.alert($scope,data.body);
	                //$scope.favmessage = data.body;
                   Dialog.success($scope, data.body);
	            }else if((data.code == '400')){
	                $("#login-dialog").modal("show");
	            }else{
	                Dialog.alert($scope,data.message);
	            }
	        }, 
	    	 	function(data){
	    	 		var rlt = data.message;
	    	 		Dialog.alert($scope,rlt);});
    	};

    	//获取单个商品的请求··
		GoodsService.getById(gid).success(function(data){
				$scope.goods = data.body;	
				//判断当前的商品库存大于0，显示价格和加入购物车
				var nowCount = $scope.goods.count;
				if(nowCount > 0){
					$scope.priceShow = true;
					$scope.addCartShow = true;
				}
		});

		//查询类别
		GoodsService.typelist().success(function(data){
				 $scope.localtypes =data.body;
		});	


		 //进入店铺
		 $scope.toMerchant = function (goods){
		 	//console.log("MID = "+goods.mid);
		 	$state.go('mall',{mid:goods.mid,flag:1});
		 };

		 		
	
		
		GoodsService.getOverallGrade(gid).success(function(data){
				$scope.grade = data.body;
				if($scope.grade.level==0){
					$scope.level="暂无";
				}else{
					$scope.level=$scope.grade.level+"分";
				};
				if($scope.grade.personCount==0){
					$scope.personCount="暂无";
				}else{
					$scope.personCount = $scope.grade.personCount;
				};
		 });

		$scope.goodscount = 1;
		
		$scope.countup = function(goods){
			 $scope.goodscount = (Number($scope.goodscount) < goods.count)? Number($scope.goodscount)+1:Number($scope.goodscount);
		};

		$scope.countdown = function(goods){
			$scope.goodscount  = (Number($scope.goodscount) == 1)? Number($scope.goodscount) : Number($scope.goodscount) -1;
		};

				 /**加入购物车*/
		 $scope.addToCart = function(goods){
		 	if(goods.count == 0){
		 		Dialog.alert($scope, "该商品暂时无货。");
		 		return;
		 	}
		 	if(!(Number($scope.goodscount)) || (Number($scope.goodscount) > goods.count) ){
		 		Dialog.alert($scope, "请输入正确的商品数量。");
		 		return;
		 	}
		 	var goodsincart = {};
		 	goodsincart.gid = goods.gid;
		 	goodsincart.gname = goods.goodsName;
		 	goodsincart.mid = goods.mid;
		 	goodsincart.mname = goods.merchantName;
		 	goodsincart.price = goods.price;
		 	if(goods.onSale) goodsincart.pprice = goods.promotionPrice;
		 	goodsincart.count = $scope.goodscount;
		 	//console.log(goods);
		 	CartService.addToCart(goodsincart)
		 	.success(function(response){
	            if(response.code == 200)
	                $("#add-cart-success-dialog").modal("show");
	            else if(response.code == 400)
	                $("#login-dialog").modal("show");
	            else
	                Dialog.alert($scope, response.message);
	        }).error(function(response){
	            Dialog.alert($scope, "网络异常，稍后重试。");
	        });
		 };
});

