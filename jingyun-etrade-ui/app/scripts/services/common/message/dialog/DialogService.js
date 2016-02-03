'use strict';


shopApp.service('Dialog', function ($http, $location,ApiService){
	
	
   this.alert = function($scope, messagehd){
        $scope.messagehd = messagehd;
        $("#illegal-request-dialog").modal("show");
   };

   this.success = function($scope, sucMessage){
        $scope.sucMessage = sucMessage;
        $("#success-dialog").modal("show");
        return $("#success-dialog");
   };



});