'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('GoodsEditController', function ($scope,$location,GoodsEditService,GoodsOperationService) {
	$scope.name = '';
	//默认查询商品+
	$scope.state = '1';
	GoodsEditService.queryGoodsList('',$scope.state,'','',0,100)
				.success(function(data){
					$scope.goodslist = data.body;
          $scope.total = $scope.goodslist.length;
				});

    /*获取当前的商家*/
  GoodsOperationService.merchantlist().success(function(data){
    $scope.merchantalllist =data.body;
  }); 
    /*获取当前的商家下的品牌*/
  $scope.getbrandbymid = function(mid){
    GoodsOperationService.brandlist(mid).success(function(data){
      $scope.brandlistbymid =data.body;
    }); 
  };

    //搜索查询商品
    $scope.serch = function(){
    	 GoodsEditService.queryGoodsList($scope.name,$scope.state,$scope.mid,$scope.bid,0,100)
				.success(function(data){
					$scope.goodslist = data.body;
           $scope.total = $scope.goodslist.length;
				});
    };
    //商品上架
  $scope.up =function(id){
     GoodsEditService.up(id);
  };
   //商品下架
  $scope.down =function(id){ 
     GoodsEditService.down(id);
  };

   $scope.changeCount =function(id,socount){ 

       var o = document.getElementById(id);
       var c = o.innerHTML; 
       var btn = document.getElementById("_"+id);
       var bv =btn.innerHTML;
       if(bv.length>=3){
           o.innerHTML = "<input type='text' size='5' id='nowCount' value='" + c + "'/>" 
          document.getElementById("_"+id).innerHTML ="保存";
       }else{
          o.innerHTML = document.getElementById("nowCount").value;
          document.getElementById("_"+id).innerHTML ="改库存";
          var count = o.innerHTML;
          if(count>0 && !isNaN(count)){
            GoodsEditService.updateCount(id,count);
          }
          else{
            alert("数字不合法");
             o.innerHTML =socount;
          }
       }
      
  };



});