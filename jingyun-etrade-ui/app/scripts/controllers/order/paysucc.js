'use strict';

shopApp.controller('PaySuccController', function ($scope, $state) {

    var count = 10;
    var interval = setInterval(function(){
        if(count > 1){
            count--;
            $("#remaining-seconds").html(count);
        }else{
        	count = 100;
        	clearInterval(interval);
            $state.go("user-center.my-order");
        }
    },1000);
});
