'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('UploadService', function ($http, ApiService) {
    
    this.single = function(fileInputElement){
        if(!fileInputElement.files || fileInputElement.files.length < 1) return;

        var fd = new FormData();
        fd.append("file", fileInputElement.files[0]);
        return $http.post(ApiService.api.upload.single, fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        });
    };

    this.multiple = function(fileInputElement){
        var fd = new FormData();
        var files = fileInputElement.files;
        for(var i = 0; i < files.length; i++){
            fd.append('file', files[i]);
        }

        return $http.post(ApiService.api.upload.multiple, fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        });
    };

});
