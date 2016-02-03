'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('HeaderController', function ($scope,$cookies) {
	//监听是否要弹出登录弹出框
	$scope.$on("request-without-login",
      function (event, msg) {
        $("#login-dialog").modal("show");
      });
});