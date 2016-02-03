'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('BrandController', function ($scope,$location,$state,BrandService,GoodsOperationService) {
	
    var bid= $state.params.bid;

    if(bid!=null){
        BrandService.getById(bid).success(function(data){
          $scope.brand =data.body;
        }); 
    }
    
    BrandService.listAllBrands().success(function(data){
                $scope.brandlist =data.body;
    }); 

    /*获取当前的商家*/
    GoodsOperationService.merchantlist().success(function(data){
        $scope.merchantlist =data.body;
    }); 

  /*获取当前的商家下的品牌*/
    $scope.serch = function(){
      if($scope.mid!=null){
              BrandService.brandByMidlist($scope.mid).success(function(data){
                $scope.brandlist =data.body;
              }); 
      }else{
        alert("请选择商家······");
      }
  };

  $scope.save =function(brand){
    BrandService.saveBrand(brand);
  };

  $scope.update = function(brand){
     BrandService.updateBrand(brand);
  };


  $scope.del = function(bid){
    //alert("删除"+bid);
    BrandService.delBrand(bid);
  };
});