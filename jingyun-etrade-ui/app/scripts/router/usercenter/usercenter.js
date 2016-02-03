'use strict';
/**
*路由定义
*/
shopApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
	$stateProvider.state('user-center', {
          url:'/user/center',
          views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: '/views/user-center/user-center.html'
                    },
                'current-position@user-center': {
                    templateUrl: '/views/user-center/current-position.html'
                   },
                'user-center-left@user-center': {
                    templateUrl: '/views/user-center/user-center-left.html'
                  },
                'user-center-bottom@user-center': {
                    templateUrl: '/views/user-center/user-center-bottom.html'
                 }
              }
       }).state('user-center.myaccount',{
            templateUrl:'/views/user-center/myaccount.html',
            url:'/account'

       }).state('user-center.user-info',{
            templateUrl:'/views/user-center/user-set/user-info.html',
            url:'/setting/info'
       }).state('user-center.avatar-setting',{
            templateUrl:'/views/user-center/user-set/avatar-setting.html',
            url:'/setting/avatar'
      }).state('user-center.safety-setting',{
            templateUrl:'/views/user-center/user-set/safety-setting.html',
            url:'/setting/safety'

      }).state('user-center.modify-mobile-login-password',{
            templateUrl:'/views/user-center/user-set/modify-mobile-login-password.html',
            url:'/passwd/update/mobile'
      }).state('user-center.modify-email-login-password',{
            templateUrl:'/views/user-center/user-set/modify-email-login-password.html',
            url:'/passwd/update/email'

         }).state('user-center.verify-email',{
            url:'/email/verification',
            views: { 
                '': {
                     templateUrl:'/views/user-center/user-set/verify-email.html'
                    }
              }
        }).state('user-center.modify-email',{
            templateUrl:'/views/user-center/user-set/modify-email.html',
            url:'/email/update'

         }).state('user-center.verify-mobile',{
            templateUrl:'/views/user-center/user-set/verify-mobile.html',
            url:'/mobile/verification'
        }).state('user-center.modify-mobile',{
            templateUrl:'/views/user-center/user-set/modify-mobile.html',
            url:'/mobile/update'

         }).state('user-center.set-mobile-pay-password',{
            templateUrl:'/views/user-center/user-set/set-mobile-pay-password.html',
            url:'/tradepwd/reset/mobile'
        }).state('user-center.set-email-pay-password',{
            templateUrl:'/views/user-center/user-set/set-email-pay-password.html',
            url:'/tradepwd/reset/email'  

         }).state('user-center.modify-mobile-pay-password',{
            templateUrl:'/views/user-center/user-set/modify-mobile-pay-password.html',
            url:'/tradepwd/update/mobile'
        }).state('user-center.modify-email-pay-password',{
            templateUrl:'/views/user-center/user-set/modify-email-pay-password.html',
            url:'/tradepwd/update/update' 

       }).state('user-center.my-coupon', {
          url:'/coupon',
          views: { 
                '': {
                    templateUrl: '/views/user-center/my-assets/my-coupon.html'
                    }
              }

         }).state('user-center.my-voucher',{
          url:'/coupon/discount',
          views: { 
                '': {
                    templateUrl: '/views/user-center/my-assets/my-voucher.html'
                    }
              }
               
      }).state('user-center.my-voucher.voucher-not-use',{
         templateUrl:'/views/user-center/my-assets/voucher-not-use.html',
          url:'/unused/:add',
          views: { 
                '': {
                    templateUrl: '/views/user-center/my-assets/voucher-not-use.html'
                    }
              }

      }).state('user-center.my-voucher.voucher-used',{
         templateUrl:'/views/user-center/my-assets/voucher-used.html',
          url:'/used'
      }).state('user-center.my-voucher.voucher-expired',{
         templateUrl:'/views/user-center/my-assets/voucher-expired.html',
          url:'/expired' 

       }).state('user-center.my-shopping-gold',{
          url:'/coupon/cash',
          views: { 
                '': {
                    templateUrl: '/views/user-center/my-assets/my-shopping-gold.html'
                    }
              }
               
      }).state('user-center.my-shopping-gold.gold-not-use',{
         templateUrl:'/views/user-center/my-assets/gold-not-use.html',
          url:'/unused/:add',
          views: { 
                '': {
                    templateUrl: '/views/user-center/my-assets/gold-not-use.html'
                    }
              }

      }).state('user-center.my-shopping-gold.gold-used',{
         templateUrl:'/views/user-center/my-assets/gold-used.html',
          url:'/used'
      }).state('user-center.my-shopping-gold.gold-expired',{
         templateUrl:'/views/user-center/my-assets/gold-expired.html',
          url:'/expired' 

       }).state('user-center.my-receive-address',{
            templateUrl:'/views/user-center/user-set/my-receive-address.html',
            url:'/addresses'
       }).state('user-center.my-order',{
           /* templateUrl:'/views/user-center/trading-center/my-order.html',*/
            url:'/orders',
            views: { 
                '': {
                     templateUrl:'/views/user-center/trading-center/my-order.html'
                    }
              }
       }).state('user-center.my-collection',{
            templateUrl:'/views/user-center/trading-center/my-collection.html',
            url:'/collection'
       }).state('user-center.my-collection.my-collection-product',{
            templateUrl:'/views/user-center/trading-center/my-collection-product.html',
            url:'/product'
       }).state('user-center.my-collection.my-collection-shop',{
            templateUrl:'/views/user-center/trading-center/my-collection-shop.html',
            url:'/shop'
       }).state('user-center.my-message',{
            templateUrl:'/views/user-center/trading-center/my-message.html',
            url:'/message',
            views:{
              '':{
                 templateUrl:'/views/user-center/trading-center/my-message.html',
              }
            }
       }).state('user-center.my-comment',{
            templateUrl:'/views/user-center/trading-center/my-comment.html',
            url:'/comment'
       }).state('user-center.my-comment.goods-info-evaluation',{
            templateUrl:'/views/user-center/trading-center/goods-info-evaluation.html',
            url:'/evaluation'

        }).state('user-center.my-comment.evaluated',{
            templateUrl:'/views/user-center/trading-center/evaluated.html',
            url:'/evaluated'
        }).state('fill-evaluation',{
          url:'/evaluation/:gid',
          views: { 
                '': {
                    templateUrl: '/views/user-center/trading-center/fill-evaluation.html'
                    }
              }
       }).state('user-center.return-record',{
            templateUrl:'/views/user-center/trading-center/return-record.html',
            url:'/refunds'

        });
});