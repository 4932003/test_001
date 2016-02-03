'use strict';


shopbackApp.service('ConstantService', function () {
    this.LOGIN_ID_KEY = "LOGIN_USER_ID";//存储到cookie中的登录用户id键值
    this.LOGIN_CART_ID_KEY = "LOGIN_CART_ID";//cookie中存储购物车的键值
});
