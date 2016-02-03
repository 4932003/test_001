'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */

shopApp.filter('nameFilter', function (){
	return function(attr){
		return attr.substring(0,1)+"***"+attr.substring(attr.length-1);
	};
	
});

