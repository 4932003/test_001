'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('ApiService', function () {
    this.api = {
        'cart':{
            'list':'http://localhost:8080/api/cart/goods/list/:uid',
            'submit':'http://localhost:8080/api/cart/clearing',
            'delete':'http://localhost:8080/api/cart/goods',
            'clear': 'http://localhost:8080/api/cart/goods/:uid',//清空用户购物车
            'countupdate':'http://localhost:8080/api/cart/goods/:id',
            'addtocart':'http://localhost:8080/api/cart',
            'count':'http://localhost:8080/api/cart/goods/count/:uid'
        },
        'order':{
        	'listClearing':'http://localhost:8080/api/cart/clearing/list',
            'submit':'http://localhost:8080/api/order',
            'listWithCondition': 'http://localhost:8080/api/orders/user/list',
            'listOrderStatus':'http://localhost:8080/api/order/status/visible',
            'singleByOID': 'http://localhost:8080/api/orders/:oid',
            'listTraces': 'http://localhost:8080/api/orders/:oid/traces',
            'getOrderAmount' :'http://localhost:8080/api/orders/user/count',
            'logistic':'http://localhost:8080/api/orders/:oid/logistic',
            'cancel':'http://localhost:8080/api/orders/cancellation',
            'receipt': 'http://localhost:8080/api/orders/receipt',
            'goods':{
                'single': 'http://localhost:8080/api/orders/goods/:ogid'
            }
        },
        'refund':{
            'submit': 'http://localhost:8080/api/refund',
            'listWithCondition':'http://localhost:8080/api/refund/user/list',
            'single': 'http://localhost:8080/api/refund/:rid',
            'singleByOGID': 'http://localhost:8080/api/refund',
            'listCerts' : 'http://localhost:8080/api/refund/certificates', 
            'update': 'http://localhost:8080/api/refund',
            'cancel': 'http://localhost:8080/api/refund/cancellation',
            'listTraces': 'http://localhost:8080/api/refund/:rid/traces',
            'logistic': 'http://localhost:8080/api/refund/:rid/logistic',
            'savelogistic': 'http://localhost:8080/api/refund/logistic'
        },
        'pay':{
            'list':'http://localhost:8080/api/payments',
            'platforminfo':'http://localhost:8080/api/payments/info',
            'typelist':'http://localhost:8080/api/pay/type/list'
        },
        'logistic':{
            'postage':'http://localhost:8080/api/logistic/postage/calculation'
        },

        //goods dxf start--------------
        'goods':{
            //查询全部商品
            'listAll':'http://localhost:8080/api/goods/all/list',
           //根据用户名模糊查询商品 /{goodsname}
            'likename':'http://localhost:8080/api/goods/',
            //查询品牌列表
            'brandlist':'http://localhost:8080/api/goods/brand/list',
            //查询类型列表
            'typelist':'http://localhost:8080/api/goods/type/list',
            //根据搜索条件查询商品信息
            'querybywhere':'http://localhost:8080/api/goods/list',
            //根据搜索条件查询店铺信息
            'querymerchantbywhere':'http://localhost:8080/api/goods/merchant/list',
            //店铺相关商品 显示全部
            'querygoodsinmerchant':'http://localhost:8080/api/goods/:mid/list',
             //在结果中搜索
            'byresult':'http://localhost:8080/api/goods/result/list',
            //查询商品详细信息 /{gid}
            'getbyid':'http://localhost:8080/api/goods/:gid',
             //推广商品
            'expandlist':'http://localhost:8080/api/goods/expand/list',
              //宝贝推荐商品
            'recommendlist':'http://localhost:8080/api/goods/recommend/list/:from/:size',
            //商品的评价
            'comment':'http://localhost:8080/api/comments/getbygid/',
            //区分中评，好评，差评
            'commentgrade':'http://localhost:8080/api/comments/grades',
            //得到对应的图片信息
            'commentimg':'http://localhost:8080/api/comments/img/:id',
            //总级别
            'getoverallgrade':'http://localhost:8080/api/comments/overall/grade',
            'brandbymid':'http://localhost:8080/api/goodsOperation/brand/:mid/list',
            'salesrecord':'http://localhost:8080/api/goods/:gid/sales/list',
            'menubrand':'http://localhost:8080/api/goods/brand/:from/:size/list',
            'menutype':'http://localhost:8080/api/goods/type/:from/:size/list'
            },
        //goods dxf end -----------------------------------

        //--------------------------qxs start
        //获取图形验证码地址
        'captcha':'http://localhost:8090/api/public/captcha/simple',
        //校验图形验证码
        'checkcaptcha':'http://localhost:8090/api/public/captcha/:code/check',
        //登录        
        'login':'http://localhost:8080/api/login',
        //退出
        'logout':'http://localhost:8080/api/logout',
        'upload' :{
            'multiple':'http://localhost:8070/api/resource/upload/multiple',
            'single':'http://localhost:8070/api/resource/upload/single'
        },
        //------------- 安全中心
        'safetyCenter' :{
            //--- 获取安全级别
            'getSafetyLevel' : 'http://localhost:8080/api/user/safety/level'
        },
        //短信
        'sms' : {
            // ?mobile=111
            'sendCode' : 'http://localhost:8080/api/sms/code',
            // 无参
            'sendCodeToUserMobile' :'http://localhost:8080/api/sms/code/user',
            // ?code=1234
            'checkSmsCode' : 'http://localhost:8080/api/sms/code/check',
        },
        //邮箱
        'email' :{
            // ?email=111@qq.com
            'sendCode' : 'http://localhost:8080/api/email/code',
            // 无参
            'sendCodeToUserEmail' :'http://localhost:8080/api/email/code/user',
            // ?code=1234
            'checkEmailCode' : 'http://localhost:8080/api/email/code/check',
        },
        
        // 收貨地址    
        'myReceieveAddress':{
            //用戶地址
            'list' : 'http://localhost:8080/api/address/list/:uid/:offset/:size',
            //all
            'listAll':'http://localhost:8080/api/address/all',
            //详情
            'single' : 'http://localhost:8080/api/address/:id',
            //add
            'add' : 'http://localhost:8080/api/address',
            //refresh
            'refresh' : 'http://localhost:8080/api/address/:id',
            //用戶地址
            'remove' : 'http://localhost:8080/api/address/:id',
            //设置默认地址
            'setDefault' : 'http://localhost:8080/api/address/default/:id'
        },
        'area' : {
            'listCountry' : 'http://localhost:8080/api/country/list',
            //根据国家查省 /{countryID}
            'listProvince' : 'http://localhost:8080/api/province/list',
            //根据省查市 /{provinceID}
            'listCity' : 'http://localhost:8080/api/city/list'
        },
        'coupon':{
            'calculation': 'http://localhost:8080/api/vip/coupon/calculation'
        },
        'cashCoupon' :{
            //未消费的
            'unusedCouponAmount' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/unused/amount/:uid',
            'unusedCoupon' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/unused/:uid',
            //已消费的
            'consumedCouponAmount' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/consumed/amount/:uid',
            'consumedCoupon' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/consumed/:uid',
            //过期的
            'overdueCouponAmount' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/overdue/amount/:uid',
            'overdueCoupon' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/overdue/:uid',
            //可使用的
            'useableCouponAmount' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/useable/amount/:uid',
            'useableCoupon' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/useable/:uid',
            //是否可激活
            'canActive' : 'http://localhost:8080/api/vip/coupon/cashcoupon/can/active/:code',
            //激活券
            'activeCashCoupon' : 'http://localhost:8080/api/vip/coupon/cashcoupon/user/:code'

        },
        'discountCoupon' :{
            //未消费的
            'unusedCouponAmount' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/unused/amount/:uid',
            'unusedCoupon' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/unused/:uid',
            //已消费的
            'consumedCouponAmount' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/consumed/amount/:uid',
            'consumedCoupon' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/consumed/:uid',
            //过期的
            'overdueCouponAmount' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/overdue/amount/:uid',
            'overdueCoupon' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/overdue/:uid',
            //可使用的
            'useableCouponAmount' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/useable/amount/:uid',
            'useableCoupon' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/useable/:uid',
            //是否可激活
            'canActive' : 'http://localhost:8080/api/vip/coupon/discountcoupon/can/active/:code',
            'activeDiscountCoupon' : 'http://localhost:8080/api/vip/coupon/discountcoupon/user/:code'

        },
        'message' :{
            'readAmount' :'http://localhost:8080/api/message/read/amount/:uid',
            'unreadAmount' :'http://localhost:8080/api/message/unread/amount/:uid',
            'list' :'http://localhost:8080/api/message/list/:uid/:from/:size',
            'detail' :'http://localhost:8080/api/message/:id',
            'refreshReadStatus' :'http://localhost:8080/api/message/:ids?read=:read',
            'delete' :'http://localhost:8080/api/message/:ids'

        },
        'helpCenter' : {
            'category' :{
                'list':'http://localhost:8080/api/information/help/center/category/list',
                'listPage':'http://localhost:8080/api/information/help/center/category/list/:offset/:size'
            },
            'detail' : {
                'list':'http://localhost:8080/api/information/help/center/detail/list/:categoryID',
                'getFirstDetailByCategory':'http://localhost:8080/api/information/help/center/detail/first/:categoryID',
                'single' : 'http://localhost:8080/api/information/help/center/detail/:id'
            }
        },
        'point' :{
            'point':'http://localhost:8080/api/vip/point/:uid'
        },
        // qxs end
        //---------------------------------- liug start 
        'goodsad':{
            'listHot24Goods':'http://localhost:8080/api/goods/hot24/list',
            'listHoneyGoods':'http://localhost:8080/api/goods/honey/list/'
        },
        'merchant':{
            'listRecommendMerchant':'http://localhost:8080/api/merchant/recommend/list',
            'listHotGoods':'http://localhost:8080/api/goods/hot/list',
            'collectMerchant':'http://localhost:8080/api/track/favorites/savemerchant/:mid'
        },
        'myaccount':{
            
        },
        'track':{
            'collectGoods':'http://localhost:8080/api/track/favorites/savegoods/:gid',
            'saveFootprintGoods':'http://localhost:8080/api/track/footprint/save/:gid',
            'listgoodsfavorites':'http://localhost:8080/api/track/favorites/listgoodsfavorites/:pcount/:pfrom',
            'listfootprintgoods':'http://localhost:8080/api/track/footprint/list/:pcount/:pfrom',
            'removefavorites':'http://localhost:8080/api/track/favorites/remove/:id',
            'listAdDetails':'http://localhost:8080/api/track/ad/list/:code',
            'otherGoodslist':'http://localhost:8080/api/track/othergoods/list/:gid/:pcount/:pfrom',
            'recommendGoodslist':'http://localhost:8080/api/track/recommend/list/:pcount/:pfrom',
            'listmerchantfavorites':'http://localhost:8080/api/track/favorites/listmerchantfavorites/:pcount/:pfrom'
        },
        //---------------------------------- liug end 
        //用户
        'user':{
            'refreshEmail' : 'http://localhost:8080/api/user/email',
            'refreshMobile' : 'http://localhost:8080/api/user/phone',
            'getLoginUser' :'http://localhost:8080/api/user/current',
            'registersave':'http://localhost:8080/api/register',
            'mobilesend':'http://localhost:8080/api/sms/code',
            'emailsend':'http://localhost:8080/api/email/code',
            'getUnusedCouponAmount':'http://localhost:8080/api/user/coupon/amount/:uid',
            'phoneExists':'http://localhost:8080/api/user/key/exists'

        },
        //修改密码
        'usercenters':{
                'gets':'http://localhost:8080/api/user/current',
                'getuser':'http://localhost:8080/api/user/one',
                'sendmessage':'http://localhost:8080/api/sms/code/user',
                'sendmobile':'http://localhost:8080/api/sms/code',
               'checkmessage':'http://localhost:8080/api/sms/code/check',

                //给登陆用户邮箱发送验证码
                'sendusermessage':'http://localhost:8080/api/email/code/user',
                //给输入邮箱发送验证码
                'sendemail':'http://localhost:8080/api/email/code',
                //验证输入码
                'checkemail':'http://localhost:8080/api/email/code/check',

                 'update':'http://localhost:8080/api/pwd/password',



               'updatemobile':'http://localhost:8080/api/user/phone',

               'installpay':'http://localhost:8080/api/tradepwd/install/tradepwd',
               
               'updatepaypwd':'http://localhost:8080/api/tradepwd/',

               'forgetpwd':'http://localhost:8080/api/sms/code/bykey',
               'eamilforgetpwd':'http://localhost:8080/api/email/code/bykey',
               'updatepwd':'http://localhost:8080/api/pwd/forgetpwd/checkcode'
        },
        
        //个人资料
        'userinfos':{
            'updateuserinfo':'http://localhost:8080/api/users/info',
            'listuserinfo':'http://localhost:8080/api/users/userinfo'
        },
        'comments':{
            'savecomments':'http://localhost:8080/api/comments',
            'queryorders':'http://localhost:8080/api/order/goods',
            'querycommentgoods':'http://localhost:8080/api/order/goods/comment',
            'getgoodgrade':'http://localhost:8080/api/comments/goods/grade',
            'getnocommentcount':'http://localhost:8080/api/order/goods/nocomment/count',
            'getcommentcount':'http://localhost:8080/api/order/goods/comment/count',
            'getcommentdetail':'http://localhost:8080/api/comments/details/:oid/:gid'
        },
        'information':{
            'querysite':'http://localhost:8080/api/information/sites/:siteid',
            'querydetails':'http://localhost:8080/api/information/details',
            'queryanydetail':'http://localhost:8080/api/information/anydetails',
            'querydetail':'http://localhost:8080/api/information/detail/:id',
            'querysitedetail':'http://localhost:8080/api/information/site/detail'
        }

    }


});
