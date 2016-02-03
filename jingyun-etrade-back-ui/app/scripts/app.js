'use strict';

/**
 * @ngdoc overview
 * @name jingyunetradebackApp
 * @description
 * # jingyunetradebackApp
 *
 * Main module of the application.
 */
var shopbackApp= angular
  .module('jingyunetradebackApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng.ueditor',
    'ui.date',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $urlRouterProvider.otherwise("/");
    $httpProvider.interceptors.push('cookiesRefreshInterceptor');
    $stateProvider
      .state('index', {
        /*templateUrl: '/views/main.html',*/
        controller: 'MainCtrl',
        controllerAs: 'main',
        url:"/",
        views: {
                  '': {
                      templateUrl: '/views/trading-center/trading-center.html'
                      },
                  'trading-center-left@index': {
                      templateUrl: 'views/trading-center/trading-center-left.html'
                    }
                }
      })
      .state('about', {
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        url:"/about"
      })
      .state('login', {
        templateUrl: '/views/login/login.html',
        url:"/login"
      })
      .state('station-goods.release-commodity',{
        templateUrl:'/views/station-goods/commodity-management/release-commodity.html',
        url:"/release-commodity"
      })
      .state('station-goods.update-goods',{
        templateUrl:'/views/station-goods/commodity-management/update-goods.html',
        url:"/update/goods?gid"
      }).state('trading-center',{
        url:"/trading-center",
        views: {
                  '': {
                      templateUrl: '/views/trading-center/trading-center.html'
                      },
                  'trading-center-left@trading-center': {
                      templateUrl: 'views/trading-center/trading-center-left.html'
                    }
                }
      }).state('trading-center.sold-goods',{
        templateUrl:'/views/trading-center/transaction-management/sold-goods.html',
        url:"/sold-goods"
      }).state('trading-center.comment',{
        templateUrl:'/views/trading-center/transaction-management/comment.html',
        url:"/comment"
      })
      .state('trading-center.wait-to-accept', {
        templateUrl: '/views/trading-center/transaction-management/wait-to-accept.html',
        url:"/order/accept"
      })
      .state('trading-center.order-detail', {
        templateUrl: '/views/trading-center/transaction-management/order-detail.html',
        url:"/order/detail?oid"
      })
      .state('trading-center.delivering', {
        templateUrl: '/views/trading-center/transaction-management/delivering.html',
        url:"/order/delivering"
      })
      .state('trading-center.delivered', {
        templateUrl: '/views/trading-center/transaction-management/delivered.html',
        url:"/order/delivered"
      })
      .state('trading-center.update-pwd', {
        templateUrl: '/views/trading-center/password/update.html',
        url:"/password/update"
      })
      .state('station-goods',{
        url:"/station-goods",
        views: { 
                  '': {
                      templateUrl: '/views/station-goods/station-goods.html'
                      },
                  'station-goods-left@station-goods': {
                      templateUrl: 'views/station-goods/station-goods-left.html'
                    }
                }
      }).state('station-info',{
        url:"/station-info",
        views: { 
                  '': {
                      templateUrl: '/views/station-info/station-info.html'
                      },
                  'station-info-left@station-info': {
                      templateUrl: 'views/station-info/station-info-left.html'
                    }
                }
      })


      .state('station-info.add-school',{
        templateUrl:'/views/information-management/add-school.html',
        url:"/add-school"
      })
       .state('station-info.add-culture',{
        templateUrl:'/views/information-management/add-culture.html',
        url:"/add-culture"
      })
        .state('station-info.add-news',{
        templateUrl:'/views/information-management/add-news.html',
        url:"/add-news"
      })
        .state('station-info.getAll-information',{
        templateUrl:'/views/information-management/getAll-information.html',
        url:"/getAll-information"
      })
        .state('station-info.update-information',{
        templateUrl:'/views/information-management/update-information.html',
        url:"/update-information/:id"
      })
      .state('station-goods.goods-list', {
        templateUrl: '/views/station-goods/goods-management/goodslist.html',
        url:"/goods/list"
      })
      ;
  })
.run(function($rootScope, $state,$cookieStore,$cookies,LOGIN_ID_COOKIE_KEY) {
  //state 跳转前监听
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){

    
    //------------身份验证 start
    //如果跳到登录页面直接放行
    if(toState.name=='login'){
      return ;
    }
    var uid = $cookies.get(LOGIN_ID_COOKIE_KEY);
    if(!uid){
        event.preventDefault();// 取消默认跳转行为

        //记录被拦截的页面信息 当登录后再调至该页面
        //失效时间
        var expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes()+10);
        $cookieStore.put('rejectState' , toState,{'expires': expireDate});
        $cookieStore.put('rejectParams' , toParams, {'expires': expireDate});
        $state.go("login",{w:'notLogin'});//跳转到登录界面
    }else{
        //刷新cookie 失效时间
        var expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes()+10);
        $cookies.put(LOGIN_ID_COOKIE_KEY , uid,{'expires': expireDate});
    }
    //--------身份验证   end
  });

  //state 跳转成功 将被拦截的state从cookie中移除
  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      //assign the "from" parameter to something
      if(to.name!='login') {
          $cookieStore.remove('rejectState');
          $cookieStore.remove('rejectParams');
      }

  });
})
//登录用户id在cookie中的key
.constant('LOGIN_ID_COOKIE_KEY', 'LOGIN_USER_ID');
//请求拦截器 每当有请求发生，更新cookies失效时间
shopbackApp.factory('cookiesRefreshInterceptor', ['$q', '$cookies', '$rootScope','LOGIN_ID_COOKIE_KEY',function($q, $cookies,$rootScope,LOGIN_ID_COOKIE_KEY) {
    var cookiesRefreshInterceptor = {
        request: function(config) {
            if (config.url.indexOf('login')>-1 || config.url.indexOf('.html')>-1) {
              return config;
            };
            //用户身份标识
            var uid = $cookies.get(LOGIN_ID_COOKIE_KEY);
            if(uid){
                  //刷新cookie 失效时间
                  var expireDate = new Date();
                  expireDate.setMinutes(expireDate.getMinutes()+10);
                  $cookies.put(LOGIN_ID_COOKIE_KEY , uid,{'expires': expireDate});
                  return config;
            }else{
              //弹出登录弹出框
              $rootScope.$broadcast("request-without-login",true);
              return $q.reject('not login');
            }
            
        }
    };

    return cookiesRefreshInterceptor;
}]);