'use strict';


shopApp.service('UserService', function ($http, $location,ApiService ){
	
	//获取登录用户信息
	this.getLoginUser = function(){
		return $http.get(ApiService.api.user.getLoginUser);
	};
	this.getPhoneExists = function(key){
		return $http.get(ApiService.api.user.phoneExists+'?key='+key);
	}

	//将手机号格式化为 158****1111 
	this.getViewMobile = function(mobile){
	    	if(mobile==null || mobile.length<11){
	    		return mobile;
	    	}

	    	return mobile.substring(0,3)+"****"+mobile.substring(7,11);
	    }
	//将邮箱格式化为 abc***123@qq.com
	this.getViewEmail = function(email){
			if(email==null || email.indexOf("@")==-1){
	    		return email;
	    	}
	        var pre = email.substring(0, email.indexOf("@"));
	        var end = email.substring(email.indexOf("@"), email.length);
	        if (pre.length>3) {
	            var middle =  parseInt (pre.length / 2);
	            var result = "";
	            result += pre.substring(0, middle-1);
	            result += "***";
	            result += pre.substring(middle+2, pre.length);
	            return result + end;
	        }else if(pre.length>1 && pre.length<=3){
	            return pre.substring(0,pre.length-1)+"***"+end
	        }
	        return email;        
	    }

	
});