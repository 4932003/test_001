'use strict';


shopApp.service('SmsService', function ($http, $location,ApiService){
	
	
	//为用户的绑定手机号发送验证码
	this.sendCodeToUserMobile= function(){
        return $http.get(ApiService.api.sms.sendCodeToUserMobile );
    };

    //为传入的手机号发送验证码
    this.sendCode= function(mobile){
        return $http.get(ApiService.api.sms.sendCode, {params:{'mobile':mobile}} );
    };

    //校验短信验证码
    this.checkCode = function( code){
        return $http.get(ApiService.api.sms.checkSmsCode, {params:{'code':code}} );
    };

    

});