'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('LoginController', function ($scope, $http, $location, $cookies,$timeout, ApiService,$rootScope,$stateParams, $state,$cookieStore) {

    //cookie信息
    var LOGIN_KEY = "LOGIN_KEY_BACK"; //手机/邮箱/用户名的key
    var LOGIN_REMEMBER = "LOGIN_REMEMBER_BACK"; //登录是否记住我

    //从cookie中获取登录信息
     $scope.$watch('$viewContentLoaded', function() {  
           if($cookies.get(LOGIN_REMEMBER) == 1){
                $("input[name='remember']").attr("checked", "checked");
                $scope.user = {
                                'key':$cookies.get(LOGIN_KEY)
                            };
                
           }else{
                $scope.user = {};
           }
        });  

    
    

	$scope.login = function(user, byDialog){
		
         
    	$http.post(ApiService.api.login.manager , getSubmitUser(user), {'Content-Type': 'application/json;charset=UTF-8'}).success(function(response){
    		if(response.code == 200){
                //如果用户点选记住我 将用户名密码放入cookie
                //失效时间
                var expireDate = new Date();
                //30天
                expireDate.setDate(expireDate.getDate() + 30);
                if($("input[name='remember']:checked").length>0){
                    
                    $cookies.put(LOGIN_KEY , user.key,{'expires': expireDate});
                    $cookies.put(LOGIN_REMEMBER, 1, {'expires': expireDate});
                    
                }else{
                    $cookies.remove(LOGIN_KEY );
                    $cookies.put(LOGIN_REMEMBER, 0);                                                                                                                                                                      
                }

                $rootScope.user = response.body;

                if(byDialog){
                    $("#login-dialog").modal("hide");
                    return;
                }
                //被拒绝跳转的页面
                var rejectState = $cookieStore.get('rejectState');
                 //跳转到登录页前的页面
                var previous = $cookieStore.get('previousState'); //
                if(rejectState && rejectState.name){
                    $state.go(rejectState.name, $cookieStore.get('rejectParams'));//
                }
                else{
                    $location.path("/");
                }

                    
                
               
    		}else{
                alert( response.message);
    		}
    	}).error(function(response){
            alert( "网络异常,请稍后重试");
    	});
	};

    var getSubmitUser = function(user){
        var userSubmit = {
            key: user.key,
            password: md5(user.password)
        };
        return userSubmit;
    }

    
    
  });
