'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('RefundService', function ($http, $location, ApiService, $state) {
    
    this.submit = function(refundVo){
        return $http.post(ApiService.api.refund.submit, refundVo, {headers:{'Content-Type':'application/json;charset=UTF-8'}});        
    };
    this.update = function(refundVo){
        return $http.put(ApiService.api.refund.update, refundVo, {headers:{'Content-Type':'application/json;charset=UTF-8'}});
    };
    this.listWithCondition = function(uid, statuscode, fromdate, keywords, from, size){
        return $http.get(
            ApiService.api.refund.listWithCondition,
            {params:{'status':statuscode, 'fromdate':fromdate, 'keywords':keywords, 'from':from, 'size':size}});
    };
    this.single = function(rid){
        return $http.get(ApiService.api.refund.single.replace(":rid", rid));
    };
    this.singleByOGID = function(ogid){
        return $http.get(ApiService.api.refund.singleByOGID, {params: {'ogid': ogid}});
    };
    this.listCertificates = function(rid){
        return $http.get(ApiService.api.refund.listCerts, {params:{'rid': rid}});
    };
    this.listTraces = function(rid, status){
        return $http.get(ApiService.api.refund.listTraces.replace(":rid", rid), {params:{'status': status}});
    };
    this.cancel = function(rid){
        return $http.put(ApiService.api.refund.cancel, {'rid':rid, 'note':'主动取消'}, {headers:{'Content-Type':'application/json;charset=UTF-8'}});
    };
    this.logistic = function(rid){
        return $http.get(ApiService.api.refund.logistic.replace(":rid", rid));
    };
    this.saveLogistic = function(logistic){
        return $http.put(ApiService.api.refund.savelogistic, logistic, {headers:{'Content-Type':'application/json;charset=UTF-8'}});
    };
});
