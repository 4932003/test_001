'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */

shopbackApp.filter('booleanFilter', function (){
	return function(attr){
		if(attr){
			return '是';
		}
		return '否';
	};
	
});

