'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('MerchantEditController', function ($scope,$state,$route,$location,MerchantEditService, ApiService) {
	var mid = $state.params.mid;//获取商家ID
	
	$scope.m = { id: "",
				 name: "",
				 ename:"",
				 code:"",
				 address:"",
				 scale:"",
				 employeeNum:"",
				 tel:"",
				 zipcode:"",
				 qq:"",
				 adminSortNum:"",
				 invoiceFlag:"0",
				 level:"1",
				 imgPath:"",
				 merchantDesc:"",
				 invoiceCodes:"",
 				 deliveryCodes:""
	};
	if(mid){
		MerchantEditService.getMerchantInfo(mid)
				.success(function(data){
					var r = data.body;
					$scope.m.id = r.id;
					$scope.m.name = r.name;
					$scope.m.ename = r.ename;
					$scope.m.code = r.code;
					$scope.m.address = r.address;
					$scope.m.scale = r.scale;
					$scope.m.employeeNum = r.employeeNum;
					$scope.m.tel = r.tel;
					$scope.m.zipcode = r.zipcode;
					$scope.m.qq = r.qq;
					$scope.m.imgPath = r.imgPath;
					$scope.m.adminSortNum = r.adminSortNum;
					$scope.m.invoiceFlag = r.invoiceFlag;
					$scope.m.level = r.level;
					$scope.m.merchantDesc = r.merchantDesc;
					//初始化发票类型和邮递类型
					var tmpinvlist = r.invoiceList;
					var tmpdellist = r.deliverylist;
					for (var i = tmpinvlist.length - 1; i >= 0; i--) {
						ios.push(tmpinvlist[i].code);
					};
					for (var i = tmpdellist.length - 1; i >= 0; i--) {
						dos.push(tmpdellist[i].code);
					};    
					/**查询发票类型列表**/
						MerchantEditService.invoicelist().get({},  
							  function(data){
					            $scope.invoicelist = data.body;
					             //选择发票类型
											  var list1 = $scope.invoicelist;
										      for(var j = 0; j < list1.length; j++){
										                for(var a = 0;a<ios.length;a++){
										                	if(list1[j].code == ios[a]){
																list1[j].selected = true;
										                	}
										                }
										      };
					           }, 
					          function(data){
					          var rlt = data.message;
					          });
						/**查询邮递类型列表**/
						MerchantEditService.deliverylist().get({},  
							  function(data){
					            $scope.deliverylist = data.body;
					            //选择邮递类型
											  var list2 = $scope.deliverylist;
										      for(var j = 0; j < list2.length; j++){
										                for(var a = 0;a<dos.length;a++){
										                	if(list2[j].code == dos[a]){
																list2[j].selected = true;
										                	}
										                }
										      };
					           }, 
					          function(data){
					          var rlt = data.message;
					          });

				});

	}else{
						/**查询发票类型列表**/
						MerchantEditService.invoicelist().get({},  
							  function(data){
					            $scope.invoicelist = data.body;
					           }, 
					          function(data){
					          var rlt = data.message;
					          });
						/**查询邮递类型列表**/
						MerchantEditService.deliverylist().get({},  
							  function(data){
					            $scope.deliverylist = data.body;
					           }, 
					          function(data){
					          var rlt = data.message;
					          });
	};
	/*上传图片*/
	$scope.doUpload = function(){
		var form = document.getElementById("fileinfo");  
		var formData = new FormData(form); 
		 var file=document.getElementById("file").files[0];
			if(file!=null){
				 $.ajax({  
						url:ApiService.api.resource.single,
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
						$scope.m.imgPath =  body;
						$scope.success ="上传成功";
					},
					error: function (data) {alert(JSON.stringify(data));}  
					}); 
			}else{
				alert("上传对象为空!");
			}
		};

	/*保存或者修改*/
	$scope.saveorupdate =function(m){
		var invoiceCodes = ios.join(',');
		var deliveryCodes = dos.join(',');
		m.invoiceCodes = invoiceCodes;
		m.deliveryCodes = deliveryCodes;
		if(m.id){
			MerchantEditService.updateMerchant(m);
		}else{
			MerchantEditService.saveMerchant(m);
		}
	};
	

	//---------------------------------------------------------------复选功能 START
    var ios = [];  //发票类型
    var dos = [];  //邮递类型
	$scope.selectInvoice = function(io){
	if(io.selected){
	    ios.push(io.code);
	}else{
	    ios.splice(ios.indexOf(io.code), 1);
	}			
	};
	$scope.selectDelivery = function(doj){
	if(doj.selected){
	    dos.push(doj.code);
	}else{
	    dos.splice(dos.indexOf(doj.code), 1);
	}		
	};

	//---------------------------------------------------------------复选功能 E N D

});