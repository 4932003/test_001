'use strict';


shopApp.directive('confirmDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/confirm-dialog.html',
            scope:{
            	confirmFunction:'&',
                message:'@'
            }
        };
    }
]);

shopApp.directive('successDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/success-dialog.html',
            scope:{
            	message:'@'
            }
        };
    }
]);

shopApp.directive('editReceivingAddressDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/edit-receiving-address-dialog.html'
        };
    }
]);


shopApp.directive('rechargeShoppingGoldDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/recharge-shopping-gold-dialog.html'
        };
    }
]);

shopApp.directive('rechargeVoucherDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/recharge-voucher-dialog.html'
        };
    }
]);


shopApp.directive('invoiceInfoDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/invoice-info-dialog.html'
        };
    }
]);

shopApp.directive('myOrderCancelConfirmDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/my-order-cancel-confirm-dialog.html'
        };
    }
]);


shopApp.directive('illegalRequestDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/illegal-request-dialog.html',
            scope:{
                messagehd:'@',
                msgdesclist:'='
            },
            controller : 'DialogController'
        };
    }
]);

shopApp.directive('myRefundConfirmDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/my-refund-confirm-dialog.html'
        };
    }
]);

shopApp.directive('orderSuccessDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/order-success-dialog.html'
        };
    }
]);

shopApp.directive('addCartSuccessDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            scope:{
                gid:'@'
            },
            templateUrl:'/views/dialog/add-cart-success-dialog.html'
        };
    }
]);

shopApp.directive('rgshVoucherRequirementDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/rgsh-voucher-requirement-dialog.html'
        };
    }
]);

shopApp.directive('editLogisticsInfoDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/edit-logistics-info-dialog.html'
        };
    }
]);

shopApp.directive('loginDialog', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/dialog/login-dialog.html'
        };
    }
]);