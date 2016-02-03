'use strict';

/**
 * @ngdoc overview
 * @name jingyunshopApp
 * @description
 * # jingyunshopApp
 *
 * Main module of the application.
 */
var shopApp = angular
  .module('jingyunshopApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('cookiesRefreshInterceptor');
    
    $stateProvider
      .state('index', {
          templateUrl: '/views/main.html',
          url:'/',
          controller: 'MainCtrl'
      }).state('user-register/register-success', {
          templateUrl:'/views/user-register/register-success.html',
          url:'/register/success',
          controller: ''
         
      }).state('register', {
          templateUrl:'/views/user-register/register.html',
          url:'/register',
          controller: ''
      }).state('login', {
          templateUrl:'/views/login/login.html',
          url:'/login',
          controller: ''
        }).state('mailbox-password', {
          templateUrl:'/views/forget-password/mailbox-password.html',
          url:'/mailboxpassword',
          controller: ''
         }).state('mobilebox-password', {
          templateUrl:'/views/forget-password/mobilebox-password.html',
          url:'/mobileboxpassword',
          controller: ''
       }).state('help-center',{
           url:'/helpcenter',
           templateUrl: '/views/help-center/help-center.html',
           abstract : true
         })
        .state('help-center.detail', {
          url: '/:categoryID/:detailID',
          templateUrl: '/views/help-center/help-center-content.html'
        })



       .state('medical-prescription-detail',{
            templateUrl:'/views/ejiao-culture/medical-prescription-detail.html',
            url:'/medical-prescription-detail/:id'
            
         }).state('story-detail',{
            templateUrl:'/views/ejiao-culture/story-detail.html',
            url:'/storydetail/:id'
       }).state('history-detail',{
            templateUrl:'/views/ejiao-culture/history-detail.html',
            url:'/historydetail/:id'
       }).state('ejiao-culture',{
            templateUrl:'/views/ejiao-culture/ejiao-culture.html',
            url:'/ejiao/culture'
       }).state('ejiao-figure-story',{
            templateUrl:'/views/ejiao-culture/ejiao-figure-story.html',
            url:'/ejiao/figurestory'
       }).state('ejiao-medical-prescription',{
            templateUrl:'/views/ejiao-culture/ejiao-medical-prescription.html',
            url:'/ejiao/medicalprescription'
       }).state('ejiao-technology',{
            templateUrl:'/views/ejiao-culture/ejiao-technology.html',
            url:'/ejiao/technology'
       }).state('ejiao-school',{
            templateUrl:'/views/ejiao-school/ejiao-school.html',
            url:'/ejiao/school'
       }).state('ejiao-school-detial',{
            templateUrl:'/views/ejiao-school/ejiao-school-detail.html',
            url:'/ejiao/school/detail:id'
       }).state('brand-news',{
            templateUrl:'/views/brand-news/brand-news.html',
            url:'/brandnews'
       }).state('brand-news-story-detail',{
            templateUrl:'/views/brand-news/brand-news-story-detail.html',
            url:'/brandnews/storydetail/:id'
       }).state('brand-news-others-detail',{
            templateUrl:'/views/brand-news/brand-news-others-detail.html',
            url:'/brandnews/detail/:id'
       }).state('consumer-protection',{
            templateUrl:'/views/consumer-protection/consumer-protection.html',
            url:'/consumerprotection'
       }).state('consumer-protection.quality-assurance',{
            templateUrl:'/views/consumer-protection/quality-assurance.html',
            url:'/qualityassurance'
       }).state('consumer-protection.seven-day-return',{
            templateUrl:'/views/consumer-protection/seven-day-return.html',
            url:'/sevendayreturn'
       }).state('businesslicense',{
            templateUrl:'/views/license/business.html',
            url:'/license/business'
       }).state('404',{
            templateUrl:'404.html',
            url:'/404'
       });
       $urlRouterProvider.when("", "/");
       $urlRouterProvider.otherwise("/404");
  })


.run(function($rootScope, $state,$cookieStore,$cookies,AuthorStateReg,LOGIN_ID_COOKIE_KEY) {
  //state 跳转前监听
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){

    //当用户在页面A跳转到登录页面，登录成功后再返回页面A
    //如果跳向登录页面将当前页面存入cookie中 
    if(toState.name=='login' && fromState.name!='register'&& fromState.name!='mobilebox-password'&& fromState.name!='mailbox-password') {
         if(fromState && fromState.name && (fromState.name!='') && (fromState.name!='login')){
            //失效时间
            var expireDate = new Date();
            expireDate.setMinutes(expireDate.getMinutes()+10);
            $cookieStore.put('previousState' , fromState,{'expires': expireDate});
            $cookieStore.put('previousParams' , fromParams, {'expires': expireDate});
         } 
        
        return;
    };
    //------------身份验证 start
    //用户身份标识
    var uid = $cookies.get(LOGIN_ID_COOKIE_KEY);
    if(!uid){
        //循环需要身份验证的正则表达式
        for (var i = 0; i < AuthorStateReg.length; i++) {
            if( toState.name.match(AuthorStateReg[i])){
              event.preventDefault();// 取消默认跳转行为

              //记录被拦截的页面信息 当登录后再调至该页面
              //失效时间
              var expireDate = new Date();
              expireDate.setMinutes(expireDate.getMinutes()+10);
              $cookieStore.put('rejectState' , toState,{'expires': expireDate});
              $cookieStore.put('rejectParams' , toParams, {'expires': expireDate});
              $state.go("login",{w:'notLogin'});//跳转到登录界面

            }   
        };
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
.constant('LOGIN_ID_COOKIE_KEY', 'LOGIN_USER_ID')
//需要身份验证的state正则表达式
.constant('AuthorStateReg', ['^user-center.*$','^order-success.*$', '^order-confirm.*$', '^order-detail.*$', '^payment-success.*$', '^cart.*$']);

//请求拦截器 每当有请求发生，更新cookies失效时间
shopApp.factory('cookiesRefreshInterceptor', ['$q', '$cookies','LOGIN_ID_COOKIE_KEY', function($q, $cookies,LOGIN_ID_COOKIE_KEY) {
    var cookiesRefreshInterceptor = {
        request: function(config) {
            //用户身份标识
            var uid = $cookies.get(LOGIN_ID_COOKIE_KEY);
            if(uid){
                  //刷新cookie 失效时间
                  var expireDate = new Date();
                  expireDate.setMinutes(expireDate.getMinutes()+10);
                  $cookies.put(LOGIN_ID_COOKIE_KEY , uid,{'expires': expireDate});
            }
            return config;
        }
    };

    return cookiesRefreshInterceptor;
}]);
