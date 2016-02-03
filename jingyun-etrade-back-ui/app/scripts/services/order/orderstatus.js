'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('OrderStatusService', function () {
    
    this.NEW_CODE                 = "NEW";
    this.PAYING_CODE              = "PAYING";
    this.PAID_CODE                = "PAID";
    this.PAYFAIL_CODE             = "PAYFAIL";
    this.ACCEPT_CODE              = "ACCEPT";
    this.DELIVERED_CODE           = "DELIVERED";
    this.RECEIVED_CODE            = "RECEIVED";
    this.COMMENTED_CODE           = "COMMENTED";
    this.CLOSED_CODE              = "CLOSED";
    this.REMOVED_CODE             = "REMOVED";
    this.REFUNDING_CODE           = "REFUNDING";
    this.REFUNDED_CODE            = "REFUNDED";
    
});
