'use strict';

shopApp.directive('paybank', function (){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/views/pay/pay-bank.html',
        scope:{
            type:'=',
            bankcode:'=',
            bankname:'=',
        },
        link: function (scope, elem, attrs){
            scope.showTab = function(type){
                scope.type = type;
            };
            scope.selectBank = function(bankcode, bankname){
                scope.bankcode = bankcode;
                scope.bankname = bankname;
            };
        }
    };
});