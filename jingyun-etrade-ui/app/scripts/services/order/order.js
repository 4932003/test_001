'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('OrderService', function ($http, $location, ApiService, PayService, $state) {
    
    this.listOrders2Clearing = function(){
        return $http.get(ApiService.api.order.listClearing);
    };
    this.listWithCondition = function(uid, statuscode, fromdate, keywords, from, size){
        return $http.get(
            ApiService.api.order.listWithCondition,
            {params:{'status':statuscode, 'fromdate':fromdate, 'keywords':keywords, 'from':from, 'size':size}});
    };
    this.listPaytype = function(){
        return $http.get(ApiService.api.pay.typelist);
    };
    this.singleOrder = function(oid){
        return $http.get(ApiService.api.order.singleByOID.replace(":oid", oid));
    };
    this.listTraces = function(oid){
        return $http.get(ApiService.api.order.listTraces.replace(":oid", oid));
    };
    this.logistic = function(oid){
        return $http.get(ApiService.api.order.logistic.replace(":oid", oid));
    };
    this.submit = function(purchaseVo){
        return $http.post(ApiService.api.order.submit, purchaseVo, {headers:{'Content-Type':'application/json;charset=UTF-8'}});        
    };
    this.cancel = function(oid, reason){
        return $http.put(ApiService.api.order.cancel, {'oid':oid, 'note':reason.v}, {headers:{'Content-Type':'application/json;charset=UTF-8'}});
    };
    this.listOrderStatus = function(){
        return $http.get(ApiService.api.order.listOrderStatus);
    };

    this.getOrderAmount = function(statuscode, fromdate, keywords){
        return $http.get(
            ApiService.api.order.getOrderAmount,
            {params:{'status':statuscode, 'fromdate':fromdate, 'keywords':keywords}});
    }

    this.confirmReceipt = function(oid, tradepwd){
        return $http.put(ApiService.api.order.receipt, {'oid':oid, 'tradepwd': tradepwd}, {headers:{'Content-Type':'application/json;charset=UTF-8'}});
    };
    this.singleGoods = function(ogid){
        return $http.get(ApiService.api.order.goods.single.replace(':ogid',ogid));
    };
});
