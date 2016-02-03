'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('GoodsService', function ($http, $location,$resource,ApiService) {
		//根据商品名模糊查询商品
/*	  	this.goodslist = function (goodsname,offset,size){
    	  	return  $http.get(ApiService.api.goods.likename + goodsname,
                        {params:{'offset':offset, 'size':size}}, 
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
    	  	};*/
        //查询推广的商品
         this.expandlist = function(){
            return $http.get(ApiService.api.goods.expandlist);
         };

         this.brandThree = function (from ,size){
            return $http.get(ApiService.api.goods.menubrand.replace(':from', from)
              .replace(':size', size));
         };

          this.typeThree = function (from ,size){
            return $http.get(ApiService.api.goods.menutype.replace(':from', from)
              .replace(':size', size));
         };
        //获取类别
        this.typelist= function(){
            return $http.get(ApiService.api.goods.typelist);
        }
        //获取品牌
        this.brandlist= function(){
            return $http.get(ApiService.api.goods.brandlist);
        }

        this.brandlistbymid  = function (mid){
          return  $http.get(ApiService.api.goods.brandbymid.replace(':mid', mid),
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
        };

        this.queryAllList = function (offset,size){
          return $http.get(ApiService.api.goods.listAll, 
                {params:{'offset':offset, 'size':size}})
        };
        //多条件查询商品
       this.query = function(brandparams, typeparams, priceFlag,order,offset,size){
            return $http.get(ApiService.api.goods.querybywhere, 
                {params:{'brands':brandparams, 'types': typeparams,
                'priceFlag':priceFlag,order:order,'offset':offset, 'size':size}})
       };
        //多条件查询店铺
       this.queryByMetchant = function (brandparams, typeparams, priceFlag,order,offset,size){
              return $http.get(ApiService.api.goods.querymerchantbywhere, 
                {params:{'brands':brandparams, 'types': typeparams,
                'priceFlag':priceFlag,order:order,'offset':offset, 'size':size}})
       };
       //商品切换按钮
       this.queryByGoods =  function(brandparams, typeparams, priceFlag,order,offset,size){
            return $http.get(ApiService.api.goods.querybywhere, 
                {params:{'brands':brandparams, 'types': typeparams,
                'priceFlag':priceFlag,order:order,'offset':offset, 'size':size}})
       };

       //店铺相关商品 
       this.queryInMerchantGoods = function (brandparams, typeparams, priceFlag,mid,offset,size){
             return $http.get(ApiService.api.goods.querygoodsinmerchant.replace(':mid', mid), 
                {params:{'brands':brandparams, 'types': typeparams,
                'priceFlag':priceFlag,'MID':mid,'offset':offset, 'size':size}})
       };

        //店铺相关商品
       this.queryMax = function (brandparams, typeparams, priceFlag,mid,order,offset,size){
             return $http.get(ApiService.api.goods.querygoodsinmerchant.replace(':mid', mid)
              , {params:{'brands':brandparams, 'types': typeparams,
                'priceFlag':priceFlag,'MID':mid,'order':order,'offset':offset, 'size':size}})
       };

       //在结果中搜索
       this.byresult = function (brandparams, typeparams, priceFlag,order,offset,size,goodsname){
            return $http.get(ApiService.api.goods.byresult, 
                {params:{'brands':brandparams, 'types': typeparams,
                'priceFlag':priceFlag,order:order,'offset':offset, 
                'size':size,goodsName:goodsname}})
       };
        //获取宝贝推荐
        this.recommendlist= function(froms,size){
            return $resource(ApiService.api.goods.recommendlist,{params:{'offset':froms,'size':size}});
        }
       this.getById = function (id){
            return $http.get(ApiService.api.goods.getbyid.replace(':gid', id))
       };
       this.getCommentsById = function(gid,from,size){
          return $http.get(ApiService.api.goods.comment+'?gid='+gid+'&from='+from+'&size='+size);
       };
       this.getCommentGrade = function(gid,commentGrade,picture,from,size){
          return $http.get(ApiService.api.goods.commentgrade+'?gid='+gid+'&commentGrade='+commentGrade+'&picture='+picture+'&from='+from+'&size='+size);
       };
       this.getOverallGrade = function(gid){
          return $http.get(ApiService.api.goods.getoverallgrade+'?gid='+gid);
       };
       this.getCommentImg = function(id){
          return $http.get(ApiService.api.goods.commentimg.replace(':id',id));
       }
      
        this.salesRecords = function(gid,offset,size){
          return $http.get(ApiService.api.goods.salesrecord.replace(':gid',gid),
                        {params:{'offset':offset, 'size':size}}, 
                        {'Content-Type': 'application/json;charset=UTF-8'}); 
        };
    });