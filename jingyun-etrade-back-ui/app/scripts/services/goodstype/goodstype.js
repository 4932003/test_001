'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('GoodsTypeService', function($http,$location,$state,$resource,ApiService){
	
	 this.listTypesByName  = function (name){
            return  $http.get(ApiService.api.goodstype.typelist+name,
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
         };
    this.listTypes = function(){
       return  $http.get(ApiService.api.goodstype.typelist,
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
    };
    this.saveGoodsType  = function (gt){
          return  $http.post(ApiService.api.goodstype.save,
          			gt,
                      {'Content-Type': 'application/json;charset=UTF-8'})
          			.success(function(response){
         				if(response.code==200){
         					alert("添加类别成功......");  
                  $state.go("station-goods.type-list");
         				}else{
         					alert("添加类别异常....."+response.message);
         				}
         			}).error(function(response){
						alert("网络异常,稍后重试.");
					});
      };


        this.updateGoodsType  = function (gt){
            return  $http.post(ApiService.api.goodstype.update+gt.id,
            			gt,
                        {'Content-Type': 'application/json;charset=UTF-8'})
            			.success(function(response){
	         				if(response.code==200){
	         					alert("修改类别成功......");
                    $state.go("station-goods.type-list");
	         				}else{
	         					alert("修改类别异常....."+response.message);
	         				}
	         			}).error(function(response){
							alert("网络异常,稍后重试.");
						});
        };


        this.delGoodsType =function(tid){
             return  $http.put(ApiService.api.goodstype.del+tid,
                     {'Content-Type': 'application/json;charset=UTF-8'})
                  .success(function(response){
                  if(response.code==200){
                    alert("删除类别成功......");  
                     $state.go("station-goods.type-list");
                  }else{
                    alert("删除类别异常....."+response.message);
                  }
                }).error(function(response){
            alert("网络异常,稍后重试.");
            });
        };

      this.getById = function (tid){
      	return  $http.get(ApiService.api.goodstype.getbyid+tid,
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
      };
       
});