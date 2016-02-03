'use strict';


shopApp.service('EmailService', function ($http, $location,ApiService){
	
	
    //为用户绑定邮箱发送验证码
    this.sendCodeToUserEmail= function(){
        return $http.get(ApiService.api.email.sendCodeToUserEmail);
    };
    //为传入的邮箱发验证码
    this.sendCode= function(email){
        return $http.get(ApiService.api.email.sendCode, {params:{'email':email}} );
    };

    //校验邮箱验证码
    this.checkCode = function(code){
        return $http.get(ApiService.api.email.checkEmailCode, {params:{'code':code}} );
    };




});