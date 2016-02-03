'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('RightTrackCtrl', function ($scope,$state,$stateParams,TrackService,GoodsService,Dialog) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var pfrom_fav = 0;
    var pfrom_foot = 0;
    $scope.getFootprintGoods = function(i) {
        pfrom_foot = pfrom_foot + i;
        if(pfrom_foot<0){
          pfrom_foot = 0;
        }
        TrackService.listfootprintgoods1().get({pcount:4,pfrom:pfrom_foot},  function(data){
            var tmpsize = BaseUtil.getJsonArrSize(data.body.goodsList);
            if (tmpsize < 4 && pfrom_foot > 0) {
              $scope.getFootprintGoods(-1); 
            }else{
              $scope.pgoods = data.body;
            };
           }, 
        function(data){
          var rlt = data.message;
          });
    };
    $scope.getFootprintGoods(0);
     $scope.getFavoritesGoods = function(i) {
        pfrom_fav = pfrom_fav + i;
        if(pfrom_fav<0){
          pfrom_fav = 0;
        }
        TrackService.listgoodsfavorites1().get({pcount:4,pfrom:pfrom_fav},  function(data){
            var tmpsize = BaseUtil.getJsonArrSize(data.body.goodslist);
            if(data.body.goodslist == ''){
               $scope.showfav = true;
            }else{
               $scope.showfav = false;
            };
            if (tmpsize < 4 && pfrom_fav > 0) {
              $scope.getFavoritesGoods(-1); 
            }else{
              $scope.fgoods = data.body.goodslist;
            };
           }, 
        function(data){
          var rlt = data.message;
          });
    };
    $scope.getFavoritesGoods(0);
    
  });
