'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jingyunshopApp
 */
angular.module('jingyunshopApp')
  .controller('MyaccountCtrl', function ($scope, MyaccountService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

  angular.module('jingyunshopApp')
  .controller('FootCtrl', function ($scope, MyaccountService) {
   
  });
