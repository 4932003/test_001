'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('TrackCtrl', function ($scope,$state,$stateParams,TrackService,GoodsService,CartService,Dialog) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var gid = $stateParams.gid;
    //收藏商品
    $scope.collectGoods = function(tid) {
        var collect = TrackService.collectGoods();
          collect.get({gid:tid},  function(data){
           if(data.code == '200'){
                  //Dialog.alert($scope,data.body);
                  // $scope.favmessage = data.body;
                  // $("#success-dialog").modal("show");
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
    $scope.saveFootprintGoods = function(gid) {
        TrackService.saveFootprintGoods(gid);
    };   
    var pfrom_fav3 = 1;
    TrackService.listgoodsfavorites3().get({pcount:pfrom_fav3*5,pfrom:0},  function(data){
            $scope.fgoodsall = data.body.goodslist;
            $scope.goodscount = data.body.count;
            if(data.body == ''){
               $scope.showfav3 = true;
            }else{
               $scope.showfav3 = false;
            }
             //是否隐藏显示更多  showmore1
            if(pfrom_fav3*5 >= $scope.goodscount){
               $scope.showmore1 = false;
            }else{
               $scope.showmore1 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
    //----------------------------我的收藏商品查看更多
     $scope.getmorefgoodsall = function(){
    pfrom_fav3 ++;
    TrackService.listgoodsfavorites3().get({pcount:pfrom_fav3*5,pfrom:0},  function(data){
            $scope.fgoodsall = data.body.goodslist;
            $scope.goodscount = data.body.count;
            if(data.body == ''){
               $scope.showfav3 = true;
            }else{
               $scope.showfav3 = false;
            }
            //是否隐藏显示更多  showmore1
            if(pfrom_fav3*5 >= $scope.goodscount){
               $scope.showmore1 = false;
            }else{
               $scope.showmore1 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
    };
    //----------------------------我的收藏商品查看更多

    //收藏商家展示
     var pfrom_fav4 = 1;
    TrackService.listmerchantfavorites().get({pcount:pfrom_fav4*5,pfrom:0},  function(data){
            $scope.fmerchantall = data.body.merchantlist;
            $scope.merchantcount = data.body.count;
            if(data.body == ''){
               $scope.showfav4 = true;
            }else{
               $scope.showfav4 = false;
            }
             //是否隐藏显示更多  showmore2
            if(pfrom_fav4*5 >= $scope.merchantcount){
               $scope.showmore2 = false;
            }else{
               $scope.showmore2 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
    //----------------------------我的收藏商家查看更多
     $scope.getmorefmerchantall = function(){
    pfrom_fav4 ++;
    TrackService.listmerchantfavorites().get({pcount:pfrom_fav4*5,pfrom:0},  function(data){
            $scope.fmerchantall = data.body.merchantlist;
            $scope.merchantcount = data.body.count;
            if(data.body == ''){
               $scope.showfav4 = true;
            }else{
               $scope.showfav4 = false;
            }
             //是否隐藏显示更多  showmore2
            if(pfrom_fav4*5 >= $scope.merchantcount){
               $scope.showmore2 = false;
            }else{
               $scope.showmore2 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
    };
    //----------------------------我的收藏商家查看更多

    //全选/反选
    var selectedIDS = [];

  $scope.selectGoods = function(fg){
    if(fg.selected){
            selectedIDS.push(fg.id);
        }else{
            selectedIDS.splice(selectedIDS.indexOf(fg.id), 1);
        }
  };

  $scope.chkall = false;
  $scope.chkAll = function(checked){
    var list = $scope.fgoodsall;
      for(var j = 0; j < list.length; j++){
                list[j].selected = checked;
                $scope.selectGoods(list[j]);
      }
  };
  //删除
  $scope.delFavGoods = function(){
    if(selectedIDS.length==0) return;
    TrackService.removefavorites(selectedIDS.join(',')).success(function(data){
      selectedIDS = [];
         TrackService.listgoodsfavorites3().get({pcount:pfrom_fav3*5,pfrom:0},  function(data){
            $scope.fgoodsall = data.body.goodslist;
            $scope.goodscount = data.body.count;
            if(data.body == ''){
               $scope.showfav3 = true;
            }else{
               $scope.showfav3 = false;
            }
             //是否隐藏显示更多  showmore1
            if(pfrom_fav3*5 >= $scope.goodscount){
               $scope.showmore1 = false;
            }else{
               $scope.showmore1 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
    });
  };
   //删除收藏信息
  $scope.remove =function(id){ 
    TrackService.removefavorites(id).success(function(data){
      selectedIDS = [];
         TrackService.listgoodsfavorites3().get({pcount:pfrom_fav3*5,pfrom:0},  function(data){
            $scope.fgoodsall = data.body.goodslist;
            $scope.goodscount = data.body.count;
            if(data.body == ''){
               $scope.showfav3 = true;
            }else{
               $scope.showfav3 = false;
            }
             //是否隐藏显示更多  showmore1
            if(pfrom_fav3*5 >= $scope.goodscount){
               $scope.showmore1 = false;
            }else{
               $scope.showmore1 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
         });
  };
   //删除商家的收藏信息
  $scope.removeFavMerchant =function(id){ 
    TrackService.removefavorites(id).success(function(data){
       TrackService.listmerchantfavorites().get({pcount:pfrom_fav4*5,pfrom:0},  function(data){
            $scope.fmerchantall = data.body.merchantlist;
            $scope.merchantcount = data.body.count;
            if(data.body == ''){
               $scope.showfav4 = true;
            }else{
               $scope.showfav4 = false;
            }
             //是否隐藏显示更多  showmore2
            if(pfrom_fav4*5 >= $scope.merchantcount){
               $scope.showmore2 = false;
            }else{
               $scope.showmore2 = true;
            }
           }, 
        function(data){
          var rlt = data.message;
          });
         });
  };

  //导向商家查询页面
    $scope.toMerchantPage =function(id){
     $state.go('mall',{mid:id,flag:1}); 
    };
  
    /**加入购物车*/
     $scope.addToCart = function(goods){
      if(goods.count == 0){
        Dialog.alert($scope, "该商品赞时无货。");
        return;
      }
      var goodsincart = {};
      goodsincart.gid = goods.gid;
      goodsincart.gname = goods.goodsName;
      goodsincart.mid = goods.mid;
      goodsincart.mname = goods.merchantName;
      goodsincart.price = goods.price;
      if(goods.onSale) goodsincart.pprice = goods.promotionPrice;
      goodsincart.count = 1;//$scope.goodscount;
      //console.log(goods);
      CartService.addToCart(goodsincart)
      .success(function(response){
              if(response.code == 200){
                  $("#add-cart-success-dialog").modal("show");
                  //alert('已成功加入购物车！');
              }else{
                  Dialog.alert($scope, response.message);
              }
          }).error(function(response){
              Dialog.alert($scope, "网络异常，稍后重试。");
          });
     };
  });
