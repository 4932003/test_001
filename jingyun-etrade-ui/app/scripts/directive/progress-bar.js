'use strict';

shopApp.directive('progressBar', ['$http' ,function ($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'/views/progress-bar.html',
            scope:{
            	level: '='
            },
            link:function($scope ,$element, $attrs, $controller){
            	$scope.$watch("level", function(newv, oldv){
            		$element.css("width", newv+"%");
            	}, true);
            }
        };
    }
]);