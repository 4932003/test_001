'use strict';
/**
*路由定义
*/
shopApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
	$stateProvider.state('order-success', {
          url:'/order/success',
          abstract:true,
          views: { 
                '': {
                    templateUrl: '/views/order/order-success.html'
                    }
              }
      }).state('order-success.detail', {
          url:'/:oids',
          templateUrl: function($stateParams){
             if($stateParams.oids.indexOf("&") > -1){
              return '/views/order/order-success-multiple.html';
             }else{
              return '/views/order/order-success-single.html';
             }
          }
      }).state('order-confirm', {
         /* templateUrl:'/views/shopping/order-confirm.html',*/
          url:'/order/confirm',
          views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: '/views/order/order-confirm.html'
                    }
              }
      }).state('order-detail',{
            templateUrl:'/views/order/order-detail.html',
            url:'/order/detail/:oid'
      }).state('cart', {
          url:'/cart',
          views: { 
                '': {
                    templateUrl: '/views/order/cart.html'
                    },
                'user-center-bottom@cart': {
                    templateUrl: '/views/user-center/user-center-bottom.html'
                 }
              }
      
      }).state('payment-success',{
            templateUrl:'/views/order/payment-success.html',
            url:'/payment/success'
      }).state('confirm-receipt', {
          templateUrl:'/views/user-center/trading-center/confirm-receipt.html',
          url:'/orders/receipt/:oid'
      });
});