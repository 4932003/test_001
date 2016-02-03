'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('OrderController', 
    function ($scope, Dialog, $cookies, ConstantService, OrderService, $state, MyReceiveAddressService, CashCouponService, DiscountCouponService, CouponService, PostageService) {
    var uid = $cookies.get(ConstantService.LOGIN_ID_KEY);


    $scope.purchaseVo = {'addressid':'', 'province':'', 'address':'', 'receiver':'', 'mobile':'', 'zipcode':'',
                'couponID':'', 'couponType':'', 'invoiceType':'', 'invoiceTitle':'',
                'paytypeCode':'ONLINE', 'paytypeName':'线上支付', 
                'orders':[
                    {'MID':'', 'mname':'', 'deliveryTypeCode':'D002', 
                    'deliveryTypeName':'普通快递', 'postage':'', 'price':'',
                    'goods':[
                        {'GID':'', 'gname':'', 'price':'', 'count':''},
                        {'GID':'', 'gname':'', 'price':'', 'count':''}
                    ]}
                ]};

    ////发票信息////////////////////////////////////////
    $scope.invoiceTypes = ['个人','企业'];
    $scope.invoice = {'required':'false', 'type':'', 'title':''};

    $scope.saveInvoice = function(){
        if($scope.invoice.type && $scope.invoice.title){
            $scope.purchaseVo.invoiceType = $scope.invoice.type;
            $scope.purchaseVo.invoiceTitle = $scope.invoice.title;
            $("#invoice-info-dialog").modal("hide");
        }else if($scope.invoice.type){
            $scope.invoiceTitleError = true;
        }else if($scope.invoice.title){
            $scope.invoiceTypeError = true;
        }else{
            $scope.invoiceTitleError = true;
            $scope.invoiceTypeError = true;
        }
    };

    $scope.cancelInvoice = function(){
        $scope.invoice.type = $scope.purchaseVo.invoiceType;
        $scope.invoice.title = $scope.purchaseVo.invoiceTitle;
        $scope.invoiceTypeError = false;
        $scope.invoiceTitleError = false;
    }

    ////////发票信息结束////////////////////////////////

    OrderService.listOrders2Clearing().success(function(data){
        $scope.transaction = data.body;
        var price = 0;
        if($scope.transaction && $scope.transaction.orders){
            $scope.finalmoney = $scope.transaction.totalPrice;
            $scope.pureOriginMoney = $scope.transaction.totalPriceWithoutPostage;
            $scope.originpostage = $scope.finalmoney - $scope.pureOriginMoney;
            if($scope.transaction.addressid){
                for (var i = 0; i < $scope.addresses.length; i++) {
                    if($scope.addresses[i].id === $scope.transaction.addressid){
                        $scope.selectAddress($scope.addresses[i]);
                        return;
                    }
                };
            }
        }else{
            Dialog.alert($scope, "订单信息不正确。");
            $state.go("cart");//should be go to illegal order page.
            return;
        }
        
    });
    
    $scope.$watch('$viewContentLoaded', function() {  
       listCashCoupon();
       listDiscountCoupon();
    }); 

    $scope.$on("activeCashCoupon",
          function (event, msg) {
            listCashCoupon();
            $("#recharge-voucher-dialog").modal("hide");
            $("#recharge-shopping-gold-dialog").modal("hide");
          }
    );
    $scope.$on("activeDiscountCoupon",
          function (event, msg) {
            listDiscountCoupon();
            $("#recharge-voucher-dialog").modal("hide");
            $("#recharge-shopping-gold-dialog").modal("hide");
          }
    );

    var listCashCoupon = function(){
        CashCouponService.getUnusedCoupon(uid).success(function(data){
            $scope.cashcoupons = data.body;
        });
    };
    
    var listDiscountCoupon = function(){
         DiscountCouponService.getUnusedCoupon(uid).success(function(data){
            $scope.discountcoupons = data.body;
        });
    };
   
    ///////////卡券 开始//////////////////

    ///1，校验所选卡券是否有效。
    ///2，计算卡券应用后的订单价格
    $scope.pureOriginMoney = 0;//没有邮费的订单价格
    $scope.originpostage = 0;//总邮费
    $scope.finalmoney = 0;//包含邮费的订单总价
    $scope.finalpoint = 0;
    $scope.$watch("finalmoney", function(oldv, newv){
        $scope.finalpoint = Math.floor($scope.finalmoney / 100);
    });
    $scope.$watch("originpostage", function(oldv, newv){
        $scope.finalmoney = $scope.pureOriginMoney + $scope.originpostage;
    });
    $scope.changeCouponSelection = function(){
        var cid = $scope.purchaseVo.couponID;
        var type = $scope.purchaseVo.couponType;
        if(uid && cid && type && $scope.pureOriginMoney){
            CouponService.calculate(uid, cid, type, $scope.pureOriginMoney)
                .success(function(data){
                    if(data.ok){
                        $scope.finalmoney = data.body + $scope.originpostage;
                    }else{
                        $scope.finalmoney = $scope.pureOriginMoney + $scope.originpostage;
                        Dialog.alert($scope, data.message);
                    }
                });
        }else{
            $scope.finalmoney = $scope.pureOriginMoney + $scope.originpostage;
        }
        console.log($scope.purchaseVo);
    };

    $scope.useDiscountCoupon = false;
    $scope.useCashCoupon = false;
    $scope.purchaseVo.couponType = (!$scope.useCashCoupon && !$scope.useDiscountCoupon) ? '' 
                        : ($scope.useCashCoupon? 'CASHCOUPON': 'DISCOUNTCOUPON');

    $scope.checkCashCoupn = function(){
        if($scope.useCashCoupon){
            $scope.useDiscountCoupon = false;
            $scope.purchaseVo.couponType = "CASHCOUPON";
            $scope.purchaseVo.couponID = '';
        }else{
            $scope.purchaseVo.couponType = '';
            $scope.purchaseVo.couponID = '';
        }
        $scope.changeCouponSelection();
    };

    $scope.checkDiscountCoupon = function(){
        if($scope.useDiscountCoupon){
            $scope.useCashCoupon = false;
            $scope.purchaseVo.couponType = "DISCOUNTCOUPON";
            $scope.purchaseVo.couponID = '';
        }else{
            $scope.purchaseVo.couponType = '';
            $scope.purchaseVo.couponID = '';
        }
        
        $scope.changeCouponSelection();
    };

    ///////////卡券 结束//////////////////
    
    $scope.setDefaultAddress = function(address){
        MyReceiveAddressService.setDefault(address.id)
        .success(function(data){
            address.defaulted = true;
        });
    };
    OrderService.listPaytype().success(function(data){
        $scope.paytypes = data.body;
    });
    
    $scope.submit = function(){
        if($scope.invoice.required == 'true'){
            if(!$scope.invoice.type || !$scope.invoice.title){
                Dialog.alert($scope, "请完善发票信息");
                return;
            }
        }
        if(!$scope.transaction || !$scope.transaction.orders){
            Dialog.alert($scope, "订单信息有误，请检查后重新提交");
            return;
        }
        
        if($scope.purchaseVo.couponID && $scope.transaction.orders.length > 1){
            $("#confirm-dialog").modal("show");
            return;
        }
        $scope.confirmSubmit();
        
    };

    $scope.confirmSubmit = function(){
        $scope.purchaseVo.orders = $scope.transaction.orders;
        angular.forEach($scope.purchaseVo.orders, function(order, index){
            order.deliveryTypeCode = 'EXPRES';
            order.deliveryTypeName = '普通快递';
        });
        OrderService.submit($scope.purchaseVo)
            .success(function(data){
                if(data.ok){
                    var purchaseVo = data.body;
                    var orders = purchaseVo.orders;
                    var oids = [];
                    for(var i = 0; i < orders.length; i++){
                        oids.push(orders[i].id);
                    }
                    if($scope.finalmoney == 0){
                        $state.go("payment-success");
                        return;
                    }else{
                        $state.go("order-success.detail", {"oids": oids.join("&")});
                        return;
                    }
                }else if(data.code === 400){
                    $("#login-dialog").modal("show");
                }else{
                    Dialog.alert($scope, data.message);
                }
            }).error(function(data){
                Dialog.alert($scope, "订单信息有误，请检查后重新提交");
            });
    };

    $scope.selectAddress = function(address){
        $scope.purchaseVo.addressid = address.id;
        $scope.purchaseVo.province = address.province;
        $scope.purchaseVo.address = address.countryName+'-'+address.provinceName+'-'+address.cityName+'-'+address.address;
        $scope.purchaseVo.receiver = address.receiver;
        $scope.purchaseVo.mobile = address.mobile;
        $scope.purchaseVo.zipcode = address.zipcode;
        $scope.useDiscountCoupon = false;
        $scope.useCashCoupon = false;
        $scope.purchaseVo.couponType = '';
        $scope.purchaseVo.couponID = '';

        var postagequery = [];
        if(!$scope.transaction || !$scope.transaction.orders){
            return;
        }
        for (var i = 0; i < $scope.transaction.orders.length; i++) {
            var pquery = {};
            var o = $scope.transaction.orders[i];
            pquery.mid = o.mid;
            pquery.price = o.price-o.postage;
            pquery.province = address.province;
            postagequery.push(pquery);
        };
        PostageService.calculate(postagequery).success(function(data){
            if(data.ok){
                var postageresponse = data.body;
                if(!postageresponse) return;
                var olen = $scope.transaction.orders.length;
                var newpostage = 0;
                for (var i = 0; i < postageresponse.length; i++) {
                    var p = postageresponse[i];
                    for (var j = 0; j < olen; j++) {
                        if($scope.transaction.orders[j].mid === p.mid){
                            var oldpostage = $scope.transaction.orders[j].postage;
                            var oldprice = $scope.transaction.orders[j].price;
                            $scope.transaction.orders[j].postage = p.postage;
                            $scope.transaction.orders[j].price = (oldprice - oldpostage) + p.postage;
                            newpostage += ($scope.transaction.orders[j].postage);
                        }
                    };
                };
                $scope.originpostage = newpostage;
            }else{
                Dialog.alert($scope, data.message);
            }
        }).error(function(data){
            Dialog.alert($scope, "网络异常，请稍后重试。");
        });
    };
    $scope.selectPaytype = function(paytype){
        $scope.purchaseVo.paytypeCode = paytype.code;
        $scope.purchaseVo.paytypeName = paytype.name;
    };
    $scope.gobackCart = function(){
        $state.go("cart");
    };
    //--------------address--start--------
    $scope.$watch('$viewContentLoaded', function() {  
       listAddress();
        
    });  

    //监听子级controller地址信息是否修改
    $scope.$on("ReceiveAddressAdd",
      function (event, msg) {
          listAddress(msg);
          $("#edit-receiving-address-dialog").modal("hide");
      });

    $scope.$on("ReceiveAddressRefresh",
      function (event, msg) {
         listAddress(msg);
         $("#edit-receiving-address-dialog").modal("hide");
      });


    var listAddress = function(selectedID){
        MyReceiveAddressService.listAll().success(function(data){
            $scope.addresses = data.body;
            if(!$scope.addresses) return ;
            for(var i = 0; i < $scope.addresses.length; i++){
                if($scope.addresses[i].id == selectedID){
                    $scope.selectAddress($scope.addresses[i]);
                    return;
                }

                if($scope.addresses[i].defaulted){
                    $scope.selectAddress($scope.addresses[i]);
                    //return;
                }
            }
        });
    }
        
    //删除收货地址
    $scope.removeAddress = function(address){
        MyReceiveAddressService.remove(address.id).success(function(data){
                if(data.ok){
                    Dialog.success($scope, '删除成功');
                    if(address.id == $scope.purchaseVo.addressid){
                        $scope.selectAddress({});
                    }
                    listAddress();
                }else{
                    Dialog.alert($scope, data.message);
                }
            })
    }

    $scope.getSingle = function(id){
        $scope.$broadcast("edit-receiving-address-dialog", id);
    }

    $scope.newAddress = function(id){
        $scope.$broadcast("new-address-dialog", id);
    }


    //修改地址

    //--------------address--end--------
});
