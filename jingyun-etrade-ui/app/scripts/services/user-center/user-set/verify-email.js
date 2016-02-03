'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('VerifyEmailService', function ($http, $location , ApiService) {
   this.getUser = function(){
        return $http.get(ApiService.api.user.getLoginUser);
    };

    this.sendSms= function(){
        return $http.get(ApiService.api.sms.sendCodeToUserMobile );
    };

    this.checkSmsCode = function( code){
        
        return $http.get(ApiService.api.sms.checkSmsCode, {params:{'code':code}} );
    };
    
    this.sendEmailCode= function(email){
        return $http.get(ApiService.api.email.sendCode, {params:{'email':email}} );
    };




    this.refreshEmail= function(email, code){
        return $http.put(ApiService.api.user.refreshEmail+'?email='+email+'&code='+code);
    };
    

  
    
});
