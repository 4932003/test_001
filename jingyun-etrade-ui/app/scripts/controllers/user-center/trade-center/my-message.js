'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('MyMessageController', function ($scope, MyMessageService, $location, $cookies, ConstantService) {
 	var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
 	//每页数量
 	$scope.size = 10;
 	//是否显示'展示更多'
 	$scope.more = false;
 	//列表集合
 	$scope.list = [];

 	$scope.$watch('$viewContentLoaded', function() {  
	 		
			getReadAmount();
		 	getUnReadAmount();
		 	$scope.getList( $scope.size);
			
        });  
 	

 	//已读数量
 	var getReadAmount = function(){
 		MyMessageService.getReadAmount(uid).success(function(data){
	 		if(data.code=200){
	 			$scope.readAmount = data.body;
	 		}
 		});
 	};
 	
 	//未读数量
 	var getUnReadAmount = function(){
 		MyMessageService.getUnReadAmount(uid).success(function(data){
	 		if(data.code==200){
	 			$scope.unreadAmount = data.body;
	 		}
	 	});
 	};
 	
 	//消息列表
 	$scope.getList = function(size){
 		MyMessageService.list(uid, $scope.list.length ,size).success(function(data){
	 		if(data.code==200){
	 			//是否显示'更多'
	 			if(data.body.length==size){
	 				$scope.more = true;
	 			}else{
	 				$scope.more = false;
	 			}

	 			for (var i = 0; i < data.body.length; i++) {
	 				$scope.list.push(data.body[i]);
	 			};
	 		}
	 	});
 	};

 	
 	

 	//读取详情
 	$scope.getDetail = function(message){
 		//显示或隐藏内容
 		if(message.showContent){
 			message.showContent = false;
 		}else{
 			message.showContent = true;
 		}

 		//选中该条
 		message.selected = true;

 		if(message.content!=null && message.content!=""){
 			return;
 		}
 		MyMessageService.getDetail(message.id).success(function(data){
 			if(data.code==200){
 				
 				getReadAmount();
 				getUnReadAmount();
 				message.content = data.body.content;
 				message.hasRead = data.body.hasRead;
 			}
 		});
 	};

 	var selectedIDS = [];

 	$scope.selectMessage = function(message){
 		if(message.selected){
            selectedIDS.push(message.id);
        }else{
            selectedIDS.splice(selectedIDS.indexOf(message.id), 1);
        }
 	};

 	//标记为已读
 	$scope.readMesages = function(){
 		if(selectedIDS.length==0) return;
 		MyMessageService.readMesages(selectedIDS.join(',')).success(function(data){
 			getReadAmount();
		 	getUnReadAmount();
		 	var list = $scope.list;
		 	for(var j = 0; j < list.length; j++){
                if(selectedIDS.indexOf(list[j].id) > -1){
                    list[j].hasRead = true;
                }
            }
			
 		});

 	};

 	//删除
 	$scope.delMsg = function(){
 		if(selectedIDS.length==0) return;
 		MyMessageService.delete(selectedIDS.join(',')).success(function(data){
 			getReadAmount();
		 	getUnReadAmount();
            //重新刷新当前页
            MyMessageService.list(uid, 0 ,$scope.list.length).success(function(data){
		 		if(data.code==200){
		 			//是否显示'更多'
		 			if(data.body.length==$scope.size){
		 				$scope.more = true;
		 			}else{
		 				$scope.more = false;
		 			}

	 				$scope.list = data.body;
	 			
	 			}
	 		});

            selectedIDS = [];
			
 		});
 	};

 	//全选/反选

 	$scope.chkall = false;
 	$scope.chkAll = function(checked){

 		var list = $scope.list;
		 	for(var j = 0; j < list.length; j++){
                list[j].selected = checked;
            }
 	};
 });