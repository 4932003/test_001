'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('GoodsTypeController', function ($scope,$location,$state,GoodsTypeService,GoodsOperationService) {
	
    var tid= $state.params.tid;

    if(tid!=null){
        GoodsTypeService.getById(tid).success(function(data){
          $scope.gt =data.body;
        }); 
    }
    
    GoodsTypeService.listTypes().success(function(data){
                $scope.typelist =data.body;
    }); 
    $scope.serch = function(){
       GoodsTypeService.listTypesByName($scope.name).success(function(data){
                $scope.typelist =data.body; 
      });
    };

  $scope.save =function(gt){
    GoodsTypeService.saveGoodsType(gt);
  };

  $scope.update = function(gt){
     GoodsTypeService.updateGoodsType(gt);
  };


  $scope.del = function(tid){
    GoodsTypeService.delGoodsType(tid);
  };
});