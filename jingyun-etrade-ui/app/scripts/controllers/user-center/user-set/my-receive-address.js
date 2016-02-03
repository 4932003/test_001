'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description 收貨地址
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('MyReceiveAddressController', function ($scope, $location , $cookies, MyReceiveAddressService, ConstantService, AreaService,Dialog) {

    var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);
    //每页数量
    $scope.size = 5;

    //是否显示'展示更多'
    $scope.more = false;
    //是否进行表单校验
    $scope.doCheck = false;
    //
    //列表集合
    $scope.list = [];
    $scope.$watch('$viewContentLoaded', function() {  
       $scope.getList( $scope.size);
       changeCssForFirefox();
        
    });  

    //
    $scope.$on("edit-receiving-address-dialog",
      function (event, msg) {
        $scope.getSingleForOrder(msg);
      });

    $scope.$on("new-address-dialog",
      function (event, msg) {
        $scope.clearAddress();
      });

       

    //消息列表
    $scope.getList = function(size){
        MyReceiveAddressService.list(uid, $scope.list.length ,size).success(function(data){
            if(data.code=200){
                //是否显示'更多'
                if(data.body && data.body.length==size){
                    $scope.more = true;
                }else{
                    $scope.more = false;
                }
                if(data.body){
                    for (var i = 0; i < data.body.length; i++) {
                        $scope.list.push(data.body[i]);
                    };
                }
            }
        });
    }
    //刷新当前列表
        var list = function(){
            var size = $scope.list.length>$scope.size ? $scope.list.length : $scope.size;
            MyReceiveAddressService.list(uid, 0 ,size)
                .success(function(data){
                    if(data.code==200){
                        $scope.list = data.body;    
                    }else{
                        Dialog.alert($scope, data.message);
                    }
                    
                });
        }

        //获取国家

        AreaService.listCountry()
        .success(function(data){
            if(data.code==200){
                $scope.countries = data.body;    
            }
            
        });
        //获取省
        $scope.getProvince = function(countryID, provinceID){
            $scope.cities = '';
            $scope.provinces =  '';
            if(countryID!=null && countryID!=''){
                AreaService.listProvince(countryID)
                .success(function(data){
                    if(data.code==200){
                        $scope.provinces = data.body;    
                        if (provinceID!=undefined) {
                            $scope.address.province = provinceID;
                        };
                    }
                    
                });
            }
            
        };

        //获取城市
        $scope.getCity = function(provinceID, cityID){
            $scope.cities = '';
            if(provinceID!=null && provinceID!=''){
                AreaService.listCity(provinceID)
                .success(function(data){
                    if(data.code==200){
                        $scope.cities = data.body;    
                         if (cityID!=undefined) {
                            $scope.address.city = cityID;
                        };
                    }
                    
                });
            }
            
        };


        $scope.submit = function(address, ifValid){
            if(ifValid){
                 if(address.id==null || address.id==''){
                    //add
                    MyReceiveAddressService.add(address).success(function(data){
                        if(data.code==200){
                            $scope.clearAddress();
                            //将更改后的地址传给父级controller
                            $scope.$emit("ReceiveAddressAdd", data.body.id);
                            list();
                        }else{
                            Dialog.alert($scope, data.message);
                        }
                    })

                }else{
                    MyReceiveAddressService.refresh(address).success(function(data){
                        if(data.code==200){
                            $scope.clearAddress();
                            //将更改后的地址传给父级controller
                            $scope.$emit("ReceiveAddressRefresh", address.id);
                            list();
                        }else{
                            Dialog.alert($scope, data.message);
                        }
                    })
                }

            }else{
                $scope.doCheck = true;

            }

           

        };

        $scope.remove = function(id){
            MyReceiveAddressService.remove(id).success(function(data){
                if(data.code==200){
                    list();
                    $scope.clearAddress();
                }else{
                    Dialog.alert($scope, data.message);
                }
            })
        }

        $scope.getSingle = function(address, list){
            MyReceiveAddressService.single(address.id).success(function(data){
                if(data.code==200){
                    
                    $scope.getProvince(data.body.country, data.body.province);
                    $scope.getCity(data.body.province, data.body.city);

                    $scope.address = data.body;
                    
                    $scope.checkAddress();

                }else{
                    Dialog.alert($scope, data.message);
                }
            })
        }

        $scope.getSingleForOrder = function(id){
            MyReceiveAddressService.single(id).success(function(data){
                if(data.code==200){
                    
                    $scope.getProvince(data.body.country, data.body.province);
                    $scope.getCity(data.body.province, data.body.city);

                    $scope.address = data.body;
                    $scope.checkAddress();

                }else{
                    Dialog.alert($scope, data.message);
                }
            })
        }

        $scope.clearAddress = function(){
            $scope.address = {};
            $scope.doCheck = false;
        }

        $scope.checkAddress = function(){
            $scope.doCheck = true;
        }

        //设置默认
        $scope.setDefault = function(){
            
            if($scope.address == undefined){
                $scope.address = {'defaulted':'true'};
            }
            $scope.address.defaulted = 'true';
            var id = $scope.address.id;
            if(id!='' && id!=undefined && id!=null){
                MyReceiveAddressService.setDefault(id).success(function(data){
                    if(data.code==200){
                        list();
                    }else{
                        Dialog.alert($scope, data.message);
                    }
                })
            }
        }
        //取消默认
        $scope.cancelDefault = function(){
            $scope.address.defaulted = 'false';
            var id = $scope.address.id;
            if(id!='' && id!=undefined && id!=null){
                MyReceiveAddressService.cancelDefault(id).success(function(data){
                    if(data.code==200){
                        list();
                    }else{
                        Dialog.alert($scope, data.message);
                    }
                })
            }
        }

        $scope.closeDialog = function(dialogId){

            $("#"+dialogId).modal("hide");
            $scope.clearAddress();
        }

        function changeCssForFirefox(){
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            
            if (userAgent.indexOf("Firefox") > -1) {
                $scope.Firefox = true;
                
            } //判断是否Firefox浏览器
        }

        
 	  

	
})	