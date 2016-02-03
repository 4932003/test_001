'use strict';

//校验图形验证码 用法同required  formName.inputName.$error.captchaCode
 shopApp.directive('checkcaptchacode', ['$http','$timeout','$window','ApiService',function($http,$timeout,$window,ApiService ) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(n) {
                
                    if(n=='' || n==null || n.length<4){
                        ctrl.$setValidity('captchaCode', false);
                        return;
                    }
                    $http.get(ApiService.api.checkcaptcha.replace(':code', n))
                    .success(function(data, status, headers, config) {
                        if(data.code == 200){
                            ctrl.$setValidity('captchaCode',true);
                        }else{
                            ctrl.$setValidity('captchaCode', false);
                        }
                                         
                    }).
                    error(function(data, status, headers, config) {
                        ctrl.$setValidity('captchaCode', false);
                    });
               
            });
        }
    };
}]);

//判断手机号/邮箱/验证码是否存在
 shopApp.directive('newkey', ['$http','$timeout','$window','ApiService',function($http,$timeout,$window,ApiService ) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(n) {
                
                   //ele.bind('keyup', function() {
                        if(!ctrl.$viewValue || ctrl.$viewValue.length<4){
                            return;
                        }
                        $http.get(ApiService.api.user.phoneExists+'?key='+ctrl.$viewValue)
                            .success(function(data, status, headers, config) {
                                if(data.body==0){
                                    ctrl.$setValidity('newkey',true);
                                }else{
                                    ctrl.$setValidity('newkey', false);
                                }
                                
                            }).
                            error(function(data, status, headers, config) {
                                ctrl.$setValidity('newkey', false);
                            });
                    });

               
            //});
        }
    };
}]);
