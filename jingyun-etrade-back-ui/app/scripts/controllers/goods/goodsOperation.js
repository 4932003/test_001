'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('GoodsOperationController', function ($scope,$timeout,$state,GoodsOperationService, ApiService) {
	var gid = $state.params.gid;
	if(gid!=null){
			//console.log("gid >>"+gid);
			GoodsOperationService.goodsVO(gid).success(function(data){
				$scope.goods= data.body;
					/*根据当前mid查询出所属品牌*/
					GoodsOperationService.brandlist($scope.goods.mid).success(function(data){
						$scope.brandlist =data.body;
					});
					$scope.thisContent = $scope.goods.content;
			});



	}
	


	//图片路径定义
	$scope.img1 ="";
	$scope.img2 ="";
	$scope.img3 ="";
	$scope.img4 ="";
	$scope.img5 ="";
	



    /*获取当前的商家*/
	GoodsOperationService.merchantlist().success(function(data){
		$scope.merchantlist =data.body;
	}); 
	GoodsOperationService.typelist().success(function(data){
		$scope.typelist =data.body;
	});
	/*获取当前的商家下的品牌*/
	$scope.getbrand = function(mid){
		GoodsOperationService.brandlist(mid).success(function(data){
			$scope.brandlist =data.body;
		}); 
	};
		
	/*上传图片*/
	$scope.doUpload = function(id){
		var form = document.getElementById("fileinfo"+id);  
		var formData = new FormData(form); 
		 var file=document.getElementById("file"+id).files[0];
			if(file!=null){
				 $.ajax({  
						url: ApiService.api.resource.single,
					    type: 'POST',  
						data: formData,
						dataType: 'JSON',
						async: false,  
						cache: false,  
						contentType: false,  
						processData: false,  
						success: function (data) {  
						var data = JSON.stringify(data);
						var body = JSON.parse(data).body;
						if(id==1){
							 //$scope.img1 =body;
							 $scope.goods.thumbpath1 =  body;
							 $scope.success1 ="上传成功";
						}else if(id==2){
							 $scope.goods.thumbpath2 =  body;
							 $scope.success2 ="上传成功";
						}else if(id==3){
							 $scope.goods.thumbpath3 =  body;
							  $scope.success3 ="上传成功";
						}else if(id==4){
							$scope.goods.thumbpath4 =  body;
							  $scope.success4 ="上传成功";
						}else if(id==5){
							 $scope.goods.thumbpath5 =  body;
							  $scope.success5 ="上传成功";
						}
					},
					error: function (data) {
						alert("上传失败,请重新上传·····");
					}  
					}); 
			}else{
				alert("上传对象为空!");
			}
		};



		$scope.checkCode = function(code){
			GoodsOperationService.checkCode(code).success(function(data){
				if(data.body=='success'){
					$scope.codeFlag="";
				}else{
					$scope.codeFlag="*商品编码重复";
				}
			});
		};
	/*保存*/
	$scope.submit=function(goods){
		/*获取ueditor*/
		var content_ = $scope.content;
		//alert("content:"+content_ );
		var uptime = $("#uptime").val();
		var downtime = $("#downtime").val();
		var onSaleBeginTime = $("#pro_start").val();
		var onSaleEndTime = $("#pro_end").val();
		var productionDate = $("#productionDate").val();
		goods.upTime = uptime;
		goods.downTime = downtime;
		goods.onSaleBeginTime = onSaleBeginTime;
		goods.onSaleEndTime = onSaleEndTime;
		goods.productionDate = productionDate;
		goods.content = content_;
		GoodsOperationService.saveGoods(goods);
	};

	/*修改*/
	$scope.update =function(goods){
		
		/*获取ueditor*/
		var content_ = $scope.content;
		//alert("content_::"+content_)
		var uptime = $("#uptime").val();
		var downtime = $("#downtime").val();
		var onSaleBeginTime = $("#pro_start").val();
		var onSaleEndTime = $("#pro_end").val();
		var productionDate = $("#productionDate").val();
		goods.upTime = uptime;
		goods.downTime = downtime;
		goods.onSaleBeginTime = onSaleBeginTime;
		goods.onSaleEndTime = onSaleEndTime;
		goods.productionDate = productionDate;
		goods.content = content_;
		goods.addTime ="";

		//alert(goods.upTime+"--"+goods.downTime)
		GoodsOperationService.updateGoods(goods);
	};
});