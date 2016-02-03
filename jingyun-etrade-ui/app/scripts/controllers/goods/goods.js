'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('goodsController', function ($scope,Dialog, $state,$stateParams,MerchantService,GoodsService) {
		//店铺显示 
		$scope.MshowFlag = false;
		//商品显示
		$scope.GshowFlag = true;
		$scope.index = 0;
		//分页开始数
		$scope.offset =0;
		//分页结束数
		$scope.size =12 ;
		//品牌数组
		$scope.brandparams = [];
		//类型数组
		$scope.typeparams = [];
		//价格
		$scope.priceFlag = 0;
		//排序
		$scope.order =0;
		//默认查询数量
		$scope.size=12;
		//查询的集合
		$scope.goodslist = [];
		//控制显示更多的按钮
		$scope.max=false;

		
		$scope.notshow = false;

		//搜索框传入的商品名
		var goodsname=$stateParams.goodsname;


		$scope.searchName = goodsname;
		//商家ID
		var mid=$stateParams.mid;
		//显示标志
		var flag = $stateParams.flag; // =1 进入店铺跳入  =2搜索商品跳入
		//根据类型查询商品 传入的tid
		var tid = $stateParams.tid;
		//类型name
		var tname = $stateParams.tname;
		//品牌id
		var bid = $stateParams.bid;
		//品牌name
		var bname = $stateParams.bname;


		//console.log(flag);
		if(bid!="" && typeof(bid) != "undefined"){
			$scope.brandparams.push(bid);
		}
		if(tid!="" && typeof(tid) != "undefined"){
			$scope.typeparams .push(tid);
		}

/*
 flag ==1 通过店铺按钮 进入的展示页  {mid ,flag}
 flag ==2 通过搜索栏进入的展示页	{goodsname ,flag}
 flag ==3 正常进入的商品展示页		{tid ,flag}	 tid 是通过商品详情页传入的根据类型查询商品
*/
		//console.log("$scope.goodslist.length :>>>>"+$scope.goodslist.length)
		if(flag==1){
			//进入店铺按钮
			$scope.GshowFlag = true; //商品显示
			$scope.MshowFlag = false; //店铺隐藏
			GoodsService.queryMax($scope.brandparams, $scope.typeparams,
				$scope.priceFlag,mid,$scope.order,$scope.goodslist.length,$scope.size)
				.success(function(data){
						listshow(data.body,$scope.size);
			});
		if($scope.typeparams.length>0){
				$('.mall-selected-type').css("display","block");
				$('.mall-selected-type').html('类型：'+tname+' <div class="icon-btn-x fr"> x</div>');
			}
		}else if (flag==2){
			//根据搜索框查询进去
			GoodsService.byresult($scope.brandparams, $scope.typeparams,
				$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size,goodsname)
				.success(function(data){
						listshow(data.body,$scope.size);



						if($scope.goodslist.length==0){
								$scope.notshow = true;
							}
		
				});

				if(goodsname!=null){
					$('.mall-selected-name').css("display","block");
					$('.mall-selected-name').html('名称：'+goodsname+' <div class="icon-btn-x fr"> x</div>');
				}

				
		}else{
			//商城进入查询商品
			GoodsService.query($scope.brandparams, $scope.typeparams, 
						$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
						.success(function(data){
							listshow(data.body,$scope.size);
						});

			if($scope.typeparams.length>0){
				$('.mall-selected-type').css("display","block");
				$('.mall-selected-type').html('类型：'+tname+' <div class="icon-btn-x fr"> x</div>');
			}
			if($scope.brandparams.length>0){
				$('.mall-selected-brand').css("display","block");
				$('.mall-selected-brand').html('品牌：'+bname+'<div class="icon-btn-x fr"> x</div>');
		    }
		}
		
	
		//删除搜索的商品名称时调用
		$scope.delgoodsname=function(){
			$state.go('mall',{flag:3,tid:"",tname:""});	
			$('.mall-selected-name').css("display","none");
		};

		//查询类别
		GoodsService.typelist().success(function(data){
					// console.log(data.body);
					 $scope.malltypes =data.body;
		});	


		if(flag==1){
			//从  根据MID 查询当前的品牌
			GoodsService.brandlistbymid(mid).success(function(data){
						 $scope.mallbrands =data.body;
			});	
		}else if(flag==2){
			//查询所有品牌
			GoodsService.brandlist().success(function(data){
						 $scope.mallbrands =data.body;
			});	
		}else{
			//查询所有品牌
			GoodsService.brandlist().success(function(data){
						 $scope.mallbrands =data.body;
			});	
		}
		

		
		
		/*
			多选扩展 TODO
			判断是否包含
			var index = exists(brand.bid, $scope.brandparams);
				if(index == -1){
					$scope.brandparams.push(brand.bid);
				}else{
					$scope.brandparams.splice(index, 1);
				}
		*/
		//品牌请求
			$scope.queryBrand = function(brand){
				$scope.brandparams.splice(0, 1);
				$scope.brandparams.push(brand.bid);
				if($scope.GshowFlag){//如果当前是商品展示页
					if(flag==1){
						//根据MID查询商品
						GoodsService.queryMax($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,mid,$scope.order,0,$scope.size)
							.success(function(data){
							$scope.goodslist=[];
							listshow(data.body,$scope.size);
						});

					}else if (flag==2){
						//带商品名的查询
						GoodsService.byresult($scope.brandparams, $scope.typeparams,
						$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
						.success(function(data){
							$scope.goodslist=[];
							listshow(data.body,$scope.size);
						});
					}else{
						//直接查询
						GoodsService.query($scope.brandparams, $scope.typeparams, 
						$scope.priceFlag,$scope.order,0,$scope.size)
						.success(function(data){
							$scope.goodslist = [];
							listshow(data.body,$scope.size);
						});
					}
				}else{
					$scope.goodslist=[];
					//店铺展示页
					GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						//console.log(data.body);
						$scope.merchants = data.body;
						$scope.max=false;
					});
				}
			$('.mall-selected-brand').css("display","block");
			$('.mall-selected-brand').html('品牌：'+brand.brandName+'<div class="icon-btn-x fr"> x</div>');
		};

		/*
			点击叉号请求品牌
		*/
		$scope.delbrand =function(){
			$scope.brandparams.splice(0, 1);
			if($scope.GshowFlag){//如果当前是商品展示页
					if(flag==1){
						//根据MID查询商品
						GoodsService.queryMax($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,mid,$scope.order,0,$scope.size)
							.success(function(data){
							$scope.goodslist=[];	
							listshow(data.body,$scope.size);
						});

					}else if (flag==2){
						//带商品名的查询
						GoodsService.byresult($scope.brandparams, $scope.typeparams,
						$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
						.success(function(data){
							$scope.goodslist=[];
							listshow(data.body,$scope.size);
						});
					}else{
						//直接查询
						GoodsService.query($scope.brandparams, $scope.typeparams, 
						$scope.priceFlag,$scope.order,0,$scope.size)
						.success(function(data){
							$scope.goodslist=[];
							listshow(data.body,$scope.size);
						});
					}
				}else{
					//店铺展示页
					$scope.goodslist=[];
					GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						//console.log(data.body);
						$scope.merchants = data.body;
						$scope.max=false;
					});
				}
				$('.mall-selected-brand').css("display","none");
		};

		//类型请求
		$scope.queryType = function(type){
			 $scope.typeparams.splice(0, 1);
			 $scope.typeparams.push(type.tid);
			if($scope.GshowFlag){
					//如果当前是商品展示页
					if(flag==1){
							GoodsService.queryMax($scope.brandparams, $scope.typeparams,
								$scope.priceFlag,mid,$scope.order,0,$scope.size)
								.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});

					}else if (flag==2){

							GoodsService.byresult($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}else{
							
							GoodsService.query($scope.brandparams, $scope.typeparams, 
							$scope.priceFlag,$scope.order,0,$scope.size)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}

				}else{
					//店铺展示页
					$scope.goodslist=[];
					GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						//console.log(data.body);
						$scope.merchants = data.body;
						$scope.max=false;
					});
				}
			$('.mall-selected-type').css("display","block");
			$('.mall-selected-type').html('类型：'+type.typeName+'<div class="icon-btn-x fr"> x</div>');
		};

		$scope.deltype = function(){
			 $scope.typeparams.splice(0, 1);
			 if($scope.GshowFlag){
					//如果当前是商品展示页
					if(flag==1){
							
							GoodsService.queryMax($scope.brandparams, $scope.typeparams,
								$scope.priceFlag,mid,$scope.order,0,$scope.size)
								.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});

					}else if (flag==2){
							
							GoodsService.byresult($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}else{
							
							GoodsService.query($scope.brandparams, $scope.typeparams, 
							$scope.priceFlag,$scope.order,0,$scope.size)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}

				}else{
					//店铺展示页
					$scope.goodslist=[];
					GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						//console.log(data.body);
						$scope.merchants = data.body;
						$scope.max=false;
					});
				}
			$('.mall-selected-type').css("display","none");
		};


		//价格请求
		$scope.queryPrice = function(ange){
	/*		if($scope.priceFlag==ange){
				$scope.priceFlag=0;
			}else{
				$scope.priceFlag=ange;
			}*/
			$scope.priceFlag=ange;
			if($scope.GshowFlag){
					//如果当前是商品展示页
					if(flag==1){
							
							GoodsService.queryMax($scope.brandparams, $scope.typeparams,
								$scope.priceFlag,mid,$scope.order,0,$scope.size)
								.success(function(data){
									$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});

					}else if (flag==2){
							
							GoodsService.byresult($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}else{
							
							GoodsService.query($scope.brandparams, $scope.typeparams, 
							$scope.priceFlag,$scope.order,0,$scope.size)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}
				}else{
					//店铺展示页
					$scope.goodslist=[];
					GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						//console.log(data.body);
						$scope.merchants = data.body;
						$scope.max=false;
					});
				}

			var thisprice ="";
			if(ange==1){
				thisprice ="0-69";
			}else if (ange==2){
				thisprice ="70-199";
			}else if (ange==3){
				thisprice ="200-399";
			}else if (ange==4){
				thisprice ="400-799";
			}else if (ange==5){
				thisprice ="800-1199";
			}else if (ange==6){
				thisprice ="1200以上";
			}
			$('.mall-selected-price').css("display","block");
			$('.mall-selected-price').html('价格：'+thisprice+'<div class="icon-btn-x fr"> x</div>');
		};

		$scope.delpriceflag = function(){
			$scope.priceFlag=0;
			if($scope.GshowFlag){
					//如果当前是商品展示页
					if(flag==1){
							GoodsService.queryMax($scope.brandparams, $scope.typeparams,
								$scope.priceFlag,mid,$scope.order,0,$scope.size)
								.success(function(data){
									$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});

					}else if (flag==2){
							GoodsService.byresult($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}else{
							GoodsService.query($scope.brandparams, $scope.typeparams, 
							$scope.priceFlag,$scope.order,0,$scope.size)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}
				}else{
					//店铺展示页
					$scope.goodslist=[];
					GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						//console.log(data.body);
						$scope.merchants = data.body;
						$scope.max=false;
					});
				}
			$('.mall-selected-price').css("display","none");
		};

		//排序请求
		$scope.queryOrder = function(order){
			$scope.order=order;
					if(flag==1){
							
							GoodsService.queryMax($scope.brandparams, $scope.typeparams,
								$scope.priceFlag,mid,$scope.order,0,$scope.size)
								.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});

					}else if (flag==2){
							
							GoodsService.byresult($scope.brandparams, $scope.typeparams,
							$scope.priceFlag,$scope.order,0,$scope.size,goodsname)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}else{
							
							GoodsService.query($scope.brandparams, $scope.typeparams, 
							$scope.priceFlag,$scope.order,0,$scope.size)
							.success(function(data){
								$scope.goodslist=[];
								listshow(data.body,$scope.size);
							});
					}
		};


		//根据条件查询店铺
		$scope.queryByMetchant = function(){
			$scope.MshowFlag = true; //店铺显示
			$scope.GshowFlag = false;//商品隐藏
			$scope.max = false;
			GoodsService.queryByMetchant($scope.brandparams, $scope.typeparams,
				$scope.priceFlag,$scope.order,0,$scope.size)
				.success(function(data){
					//console.log(data.body);
					$scope.merchants = data.body;
				});
		};
		//查询商品
		$scope.queryByGoods = function(){
			$scope.GshowFlag = true; //商品显示
			$scope.MshowFlag = false; //店铺隐藏
			$state.go('mall',{flag:3,tid:"",tname:""});	
		};
		//店铺相关商品4条
		$scope.queryInMerchantGoods=function(merchant){
			//判断是否隐藏和显示
			if(merchant.mid ==$scope.index){
				$scope.index = false;
			}else{
				$scope.InMerchantGoods=[];
				$scope.index = merchant.mid;
				GoodsService.queryInMerchantGoods($scope.brandparams, $scope.typeparams,
				$scope.priceFlag,merchant.mid,0,4).success(function(data){
					$scope.InMerchantGoods = data.body;
					$scope.merchantlenth =$scope.InMerchantGoods.length;
				});
			}
			
		};

		//在结果中搜索
		$scope.serchByresult = function (){
			if($scope.gnames!=null){
				
				GoodsService.byresult($scope.brandparams, $scope.typeparams,
				$scope.priceFlag,$scope.order,0,$scope.size,$scope.gnames)
				.success(function(data){
					$scope.goodslist=[];
					listshow(data.body,$scope.size);
				});
			}
		};

		$scope.nextMax = function (sum){
			//console.log("flag =" +flag);
			if(flag==1){
				GoodsService.queryMax($scope.brandparams, $scope.typeparams,
					$scope.priceFlag,mid,$scope.order,$scope.goodslist.length,$scope.size)
					.success(function(data){
						listshow(data.body,$scope.size);
				});

			}else if(flag==2){
				GoodsService.byresult($scope.brandparams, $scope.typeparams,
				$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size,goodsname)
				.success(function(data){
						listshow(data.body,$scope.size);
				});
			}else{
				GoodsService.query($scope.brandparams, $scope.typeparams, 
						$scope.priceFlag,$scope.order,$scope.goodslist.length,$scope.size)
						.success(function(data){
							listshow(data.body,$scope.size);
						});


			}
		}

		var exists = function (v, arr){
			for (var i = 0; i <= arr.length; i++) {
				if(arr[i] == v){
					return i;
				}
			}
			return -1;
		};

		//控制显示商品和更多按钮
		var listshow = function(arr,size){
			for (var i = 0; i <arr.length; i++) {
					$scope.goodslist.push(arr[i]);
				}			
				if( arr.length==size){
					$scope.max=true;
				}else{
					$scope.max=false;
				}

		};

			
		//收藏店铺
		$scope.collectMerchant = function(mid) {
        var collect = MerchantService.collectMerchant();
        collect.get({mid:mid},  function(data){
                if(data.code == '200'){
                    var rlt =  data.body;
                    //Dialog.alert($scope,rlt);
                    // $scope.favmessage = rlt;
                    // $("#success-dialog").modal("show");
                    Dialog.success($scope, rlt);
                }else if((data.code == '400')){
                    $("#login-dialog").modal("show");
                }else{
                    var rlt =  data.message;
                    Dialog.alert($scope,rlt);
                }
            }, 
        function(data){
          var rlt = data.message;
          Dialog.alert($scope,rlt);
                });
    };
  });