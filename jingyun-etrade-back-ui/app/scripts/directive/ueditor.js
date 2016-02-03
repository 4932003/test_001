'use strict';

shopbackApp.directive('ueditor',['ApiService', function (ApiService) {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    template: '<script name="content" type="text/plain" ng-transclude>GGG</script>',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModel) {
      var ue = UE.getEditor('editor');
      UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
      UE.Editor.prototype.getActionUrl= function(action){
                
                if (action == 'uploadimage' || action == 'uploadscrawl' ) {
                  return ApiService.api.resource.ueditor;
                }
                else{
                   return ue._bkGetActionUrl.call(this, action);
                }
            
       }

       //--------------修改时回显编辑器的内容
        ue.addListener('ready', function () {
            setTimeout(function () {
                if(scope.thisContent!=null){
                  ue.setContent(scope.thisContent);
                }
              
            }, 3000);
          })
       //----------------------------------------
       //-------赋值给textarea 方便后台获取编辑器的数据
        if (ngModel) {
          ue.addListener('contentChange', function () {
            setTimeout(function () {
              scope.$apply(function () {
                ngModel.$setViewValue(ue.getContent());
              })
            }, 0);
          })

        }
      //-------

      

    }
  }
}]);