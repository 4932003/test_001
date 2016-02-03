'use strict';


shopbackApp.directive('loginDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/login-dialog.html'
        };
    }
]);