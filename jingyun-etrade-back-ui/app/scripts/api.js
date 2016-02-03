'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('ApiService', function () {
    this.api = {
        
        'order':{
            'listWithCondition': 'http://localhost:8080/api/orders/manager/list',
            'accept':'http://localhost:8080/api/orders/acception',
            'delivered':'http://localhost:8080/api/orders/logistic',
            'singleByOID':'http://localhost:8080/api/orders/:oid',
            'listTraces': 'http://localhost:8080/api/orders/:oid/traces',
            'logistic':'http://localhost:8080/api/orders/:oid/logistic',
            'listOrderStatus':'http://localhost:8080/api/order/status/visible',
            'cancel':'http://localhost:8080/api/orders/cancellation',
            'count':'http://localhost:8080/api/orders/manager/count'
        },
        'refund':{
            'listWithCondition': 'http://localhost:8080/api/refund/manager/list',
            'accept':'http://localhost:8080/api/refund/acception',
            'deny':'http://localhost:8080/api/refund/denial',
            'done':'http://localhost:8080/api/refund/completion'
        },
        'login':{
            'seller':'http://localhost:8080/api/login/seller',
            'manager':'http://localhost:8080/api/login/manager'
        },
        'logout':'http://localhost:8080/api/logout',
        'refreshPwd':'http://localhost:8080/api/pwd/manager',
        //用户
        'user':{
            'getLoginUser' :'http://localhost:8080/api/user/current'
        },
        //卖家
        'seller':{
            'current' :'http://localhost:8080/api/seller/current'
        },
        //管理员
        'manager':{
            'current' :'http://localhost:8080/api/manager/current'
        },

        'helpCenter':{
            'category' : {
            	'list' : 'http://localhost:8080/api/information/help/center/category/list',
            	'single' : 'http://localhost:8080/api/information/help/center/category/:id',
            	'save' :'http://localhost:8080/api/information/help/center/category/',
            	'refresh' :'http://localhost:8080/api/information/help/center/category/:id',
            	'remove' :'http://localhost:8080/api/information/help/center/category/:id'
            },
            'detail' : {
            	'list' : 'http://localhost:8080/api/information/help/center/detail/list/:categoryID',
            	'single' : 'http://localhost:8080/api/information/help/center/detail/:id',
            	'save' :'http://localhost:8080/api/information/help/center/detail/',
            	'refresh' :'http://localhost:8080/api/information/help/center/detail/:id',
            	'remove' :'http://localhost:8080/api/information/help/center/detail/:id'
            }
        },

        'counpon':{
            'cashcounpon' : {
                'list' : 'http://localhost:8080/api/vip/coupon/cashcoupon/list/:from/:size',
                'count' : 'http://localhost:8080/api/vip/coupon/cashcoupon/amount',
                'save' : 'http://localhost:8080/api/vip/coupon/cashcoupon/:amount',
                'unlock' : 'http://localhost:8080/api/vip/coupon/cashcoupon/unlock/:ids'
            },
            'discountcounpon' : {
                'list' : 'http://localhost:8080/api/vip/coupon/discountcoupon/list/:from/:size',
                'count' : 'http://localhost:8080/api/vip/coupon/discountcoupon/amount',
                'save' : 'http://localhost:8080/api/vip/coupon/discountcoupon/:amount',
                'unlock' : 'http://localhost:8080/api/vip/coupon/discountcoupon/unlock/:ids'
            }
        },
        'goods':{//根据条件查询商品
            'queryGoodsList':'http://localhost:8080/api/back/goods/list',
            'up':'http://localhost:8080/api/goodsOperation/up/',
            'down':'http://localhost:8080/api/goodsOperation/down/'
        },
        'goodsOperation':{//商品操作
            'merchantlist':'http://localhost:8080/api/goodsOperation/merchant/list',
            'brandlist':'http://localhost:8080/api/goodsOperation/brand/:mid/list',
            'typelist':'http://localhost:8080/api/goods/type/list',
            'show':'http://localhost:8080/api/goodsOperation/updateview/',
            'save':'http://localhost:8080/api/goodsOperation/save',
            'update':'http://localhost:8080/api/goodsOperation/update/',
            'updatecount':'http://localhost:8080/api/goodsOperation/modfiycount/:gid/:count',
            'checkcode':'http://localhost:8080/api/goodsOperation/checkcode/:code'
        },       
  
        'merchant':{//根据条件查询商品
            'queryMerchantList':'http://localhost:8080/api/merchant/list',
            'getMerchantInfo':'http://localhost:8080/api/merchant/info/:mid',
            'update':'http://localhost:8080/api/merchant/updatemerchant',
            'save':'http://localhost:8080/api/merchant/savemerchant',
             'invoicelist':'http://localhost:8080/api/merchant/invoicetype/list',
            'deliverylist':'http://localhost:8080/api/merchant/deliverytype/list'
        },
        'getinformation':{
            'getSchoolSite':'http://localhost:8080/api/information/sites/:siteid',
            'getSchoolName':'http://localhost:8080/api/information/sitesSchool/:names',
            'saveSchool':'http://localhost:8080/api/information/savedetails',
            'alldetail':'http://localhost:8080/api/information/alldetail',
            'getMerchantInfo':'http://localhost:8080/api/merchant/info/:mid',
            'update':'http://localhost:8080/api/merchant/updatemerchant',
            'save':'http://localhost:8080/api/merchant/savemerchant',
			 'invoicelist':'http://localhost:8080/api/merchant/invoicetype/list',
            'deliverylist':'http://localhost:8080/api/merchant/deliverytype/list',
            'deletedetail':'http://localhost:8080/api/information/delete/:id',
            'updateInfo':'http://localhost:8080/api/information/update',
            'getInfoById':'http://localhost:8080/api/information/detail/:id',
            'getInfoByName':'http://localhost:8080/api/information/byname/detail',
            'maxOrders':'http://localhost:8080/api/information/detail/orders/:id'


        },
        'comment':{
            'querycomment':'http://localhost:8080/api/allcomments'
        },
        'resource':{
            'ueditor':'http://localhost:8080/api/resource/ueditor/upload',
            'single':'http://localhost:8080/api/resource/upload/single'
        },
        'track':{//推广系统模块
            'getAddetailInfo':'http://localhost:8080/api/track/addetail/info/:id',
            'updateAddetail':'http://localhost:8080/api/track/addetail/updateAddetail',
            'saveAddetail':'http://localhost:8080/api/track/addetail/saveAddetail',
            'getAdmoduleInfo':'http://localhost:8080/api/track/admodule/info/:id',
            'updateAdmodule':'http://localhost:8080/api/track/admodule/updateAdmodule',
            'saveAdmodule':'http://localhost:8080/api/track/admodule/saveAdmodule',
            'queryAdmoduleList':'http://localhost:8080/api/track/admodule/list',
            'queryAddetailList':'http://localhost:8080/api/track/addetail/list',
            'removeAddetail':'http://localhost:8080/api/track/addetail/remove/:id',
            'removeAdmodule':'http://localhost:8080/api/track/admodule/remove/:id',
            'admodulelist':'http://localhost:8080/api/track/admodule/list'
        },
        'brand':{
            'brandbymid':'http://localhost:8080//api/brand/:mid/list',
            'save':'http://localhost:8080/api/brand/save',
            'getbyid':'http://localhost:8080/api/brand/updateview/',
            'update':'http://localhost:8080/api/brand//update/',
             'del':'http://localhost:8080/api/brand/',
              'alllist':'http://localhost:8080/api/brand/all/list'
            


        },
        'goodstype':{
            'typelist':'http://localhost:8080//api/goodstype/list/',
            'save':'http://localhost:8080/api/goodstype/save',
            'getbyid':'http://localhost:8080/api/goodstype/single/',
            'update':'http://localhost:8080/api/goodstype/update/',
            'del':'http://localhost:8080/api/goodstype/del/'
        }
    }
});
