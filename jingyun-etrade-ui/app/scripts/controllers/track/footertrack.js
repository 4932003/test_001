'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('FootTrackCtrl', function ($scope,$state,$stateParams,TrackService,Dialog) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var pfrom_fav2 = 0;
    var pfrom_foot2 = 0;
    //--------------------------------------我的收藏插件 start
    $scope.getFavoritesGoods2 = function(i) {
        pfrom_fav2 = pfrom_fav2 + i;
        if(pfrom_fav2<0){
          pfrom_fav2 = 0;
        }
        TrackService.listgoodsfavorites1().get({pcount:6,pfrom:pfrom_fav2},  function(data){
            var tmpsize = BaseUtil.getJsonArrSize(data.body.goodslist);
            if(data.body.goodslist == ''){
               $scope.showfav2 = true;
            }else{
               $scope.showfav2 = false;
            };
            if (tmpsize < 6 && pfrom_fav2 > 0) {
              $scope.getFavoritesGoods2(-1); 
            }else{
              $scope.fgoods2 = data.body.goodslist;
            };
           }, 
        function(data){
          var rlt = data.message;
          });
    };
    $scope.getFavoritesGoods2(0);
    //--------------------------------------我的收藏插件 end
     
    //---足迹 start
     $scope.getFootprintGoods2 = function(i) {
        pfrom_foot2 = pfrom_foot2 + i;
        if(pfrom_foot2<0){
          pfrom_foot2 = 0;
        }
        TrackService.listfootprintgoods2().get({pcount:6,pfrom:pfrom_foot2},  function(data){
            var tmpsize = BaseUtil.getJsonArrSize(data.body.goodsList);
            if (tmpsize < 6 && pfrom_foot2 > 0) {
              $scope.getFootprintGoods2(-1); 
            }else{
              $scope.pgoods2 = data.body;
            };
           }, 
        function(data){
          var rlt = data.message;
          });
    };
    $scope.getFootprintGoods2(0);
    //---足迹  end
  //查询猜你喜欢 宝贝推荐
   TrackService.recommendGoodslist().get({pfrom:0,pcount:6},  function(data){
              $scope.recommendlist = data.body;
           }, 
        function(data){
          var rlt = data.message;
  });
  });
