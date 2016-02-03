'use strict';
/**
*商品路由定义 商品搜索页 商品展示页
*/
shopApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
	$stateProvider.state('mall', {
          url:'/mall?goodsname&mid&flag&tid&tname&bname&bid',
          //url:'/mall/:goodsname/:mid/:flag/:tid/:tname/:bname/:bid',
          views: {
                '': {
                    templateUrl: '/views/mall/mall.html'
                    },
                'user-center-bottom@myaccount': {
                    templateUrl: '/views/user-center/user-center-bottom.html'
                 }
              }
      }).state('product-detail',{
         /* templateUrl:'/views/product/product-detail.html',*/
          url:'/product/detail/:gid',
          controller: function($stateParams){
              $stateParams.gid  
          },
          views: { 
                '': {
                    templateUrl: '/views/product/product-detail.html'
                    },
                'pd-mr-comment@product-detail': {
                    templateUrl: '/views/product/product-comment.html'
                 }
              }
      }).state('product-detail.description',{
         templateUrl:'/views/product/product-description.html',
          url:'/description'
      }).state('product-detail.comment',{
         templateUrl:'/views/product/product-comment.html',
          url:'/comment'
      }).state('product-detail.trade-record',{
         templateUrl:'/views/product/product-trade-record.html',
          url:'/trade-record/'
     
      });


});