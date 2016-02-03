'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('MainCtrl', function ($scope,Dialog,$state,MerchantService,GoodsService,TrackService) {
   
   /* MerchantService.listRecommendMerchant().success(function(data){
        $scope.merchants = data.body;
    });*/   //首页商家推荐修改 注释
 TrackService.listAdDetails().get({code:'ADM001'},  function(data){
             $scope.merchants = data.body;
           }, 
          function(data){
          var rlt = data.message;
          });
	MerchantService.listHotGoods().success(function(data){
        $scope.hootgoods = data.body;
    });
  $scope.collectMerchant = function(mid) {
        var collect = MerchantService.collectMerchant();
        collect.get({mid:mid},  function(data){
                if(data.code == '200'){
                    var rlt =  data.body;
                    //Dialog.alert($scope,rlt);
                    // $scope.favmessage = rlt;
                    // $("#success-dialog").modal("show");
                    Dialog.success($scope, rlt);
                }else if((data.code == '400')){
                    $("#login-dialog").modal("show");
                }else{
                    var rlt =  data.message;
                    Dialog.alert($scope,rlt);
                }
            }, 
        function(data){
          var rlt = data.message;
          Dialog.alert($scope,rlt);
                });
    };

  //$scope.collectMerchant();
  
    //宝贝推荐
  /* GoodsService.recommendlist().get({from:0,size:3},  function(data){
              $scope.recommendlist = data.body;
           }, 
        function(data){
          var rlt = data.message;
          });*/
   TrackService.listAdDetails().get({code:'ADM002'},  function(data){
             $scope.recommendlist = data.body;
           }, 
          function(data){
          var rlt = data.message;
          });
    //导向商家查询页面
    $scope.toMerchantPage =function(id){
     $state.go('mall',{mid:id,flag:1}); 
    };
  });
