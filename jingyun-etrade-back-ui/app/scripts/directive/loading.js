'use strict';

shopbackApp.directive('loading', ['$http' ,function ($http){
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    var reqs = $http.pendingRequests;
                    for(var i = 0; i < reqs.length; i++){
                        if(reqs[i].method === 'POST'
                            || reqs[i].method === 'PUT'
                            || reqs[i].method === 'DELETE'){
                            return true;
                        }
                    }
                    return false;
                    //return $http.pendingRequests.length > 0;
                };
                scope.$watch(scope.isLoading, function (v){
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    }
]);


/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.directive('onFinishRender', ['$timeout', function($timeout){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            if ($scope.$last === true) {
                $timeout(function () {
                    $scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}]);