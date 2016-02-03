'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.controller('CartController', function ($scope, CartService, $cookies, $state, ConstantService, Dialog) {
    
    var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);

    CartService.listCarts(loginuid).success(function(data){
        
        $scope.carts = data.body;
        var notEmpty = ifcartempty();
        $scope.empty = !notEmpty;
    });

    var ifcartempty = function(){
        return (($scope.carts)
                        && ($scope.carts.orders)
                        && ($scope.carts.orders.length > 0)
                        && ($scope.carts.orders[0].goods)
                        && ($scope.carts.orders[0].goods.length > 0));
    };

    $scope.submit = function(carts){
        var orders = carts.orders;
        var newCarts = {};
        newCarts.uid = carts.uid;
        newCarts.orders = [];

        angular.forEach(orders, function(order, index){
            var existedNewOrder = orderExists(order.mid, newCarts.orders);
            var bhasGoods = hasGoods(order);
            if(!existedNewOrder && bhasGoods){
                existedNewOrder = {};
                existedNewOrder.mid = order.mid;
                existedNewOrder.mname = order.mname;
                existedNewOrder.goods = [];
                newCarts.orders.push(existedNewOrder);
            }
            var goods = order.goods;
            angular.forEach(goods, function(singleGoods, index){
                if(singleGoods.selected && singleGoods.stock >= singleGoods.count){
                    existedNewOrder.goods.push(singleGoods);
                }
            });
        });
        if(newCarts.orders.length == 0){
            Dialog.alert($scope, "请选择商品！");
            return;
        }
        
        CartService.submit(newCarts)
            .success(function(response){
                if(response.ok){
                    $state.go("order-confirm");
                }else{
                    Dialog.alert($scope, response.message);
                }
            })
            .error(function(response){
                Dialog.alert($scope, "网络异常，请稍后重试。");
            });
    };
    $scope.selectedGoods = [];

    $scope.selectOneGoods = function(goods){
        if(goods.stock <= 0){
            return;
        }
        if(goods.selected){
            $scope.selectedGoods.push(goods);
        }else{
            $scope.selectedGoods.splice($scope.selectedGoods.indexOf(goods), 1);
        }
    };
    $scope.selectGoodsInOrder = function(order){
        if(order.selected){
            var goods = order.goods;
            for(var i = 0; i < goods.length; i++){
                if(goods[i].selected) continue;
                if(goods[i].stock <= 0) continue;
                goods[i].selected = true;
                $scope.selectedGoods.push(goods[i]);
            }
        }else{
            var goods = order.goods;
            for(var i = 0; i < goods.length; i++){
                goods[i].selected = false;
                $scope.selectedGoods.splice($scope.selectedGoods.indexOf(goods[i]), 1);
            }
        }
    }
    $scope.allSelected = false;
    $scope.selectGoodsInCart = function(){
        if($scope.allSelected){
            var orders = $scope.carts.orders;
            for(var i = 0; i < orders.length; i++){
                orders[i].selected = true;
                var goods = orders[i].goods;
                for(var j = 0; j < goods.length; j++){
                    if(goods[j].selected) continue;
                    if(goods[j].stock <= 0) continue;
                    goods[j].selected = true;
                    $scope.selectedGoods.push(goods[j]);
                }
            }
        }else{
            var orders = $scope.carts.orders;
            for(var i = 0; i < orders.length; i++){
                orders[i].selected = false;
                var goods = orders[i].goods;
                for(var j = 0; j < goods.length; j++){
                    goods[j].selected = false;
                    $scope.selectedGoods.splice($scope.selectedGoods.indexOf(goods[j]), 1);
                }
            }
        }
    }

    /**删除指定商品*/
    $scope.delCartGs = function(goods, cart){
        var gs = [];
        gs.push(goods);
        CartService.delCartGses(gs).success(function(data){
            cart.goods.splice(cart.goods.indexOf(goods), 1);
            $scope.selectedGoods.splice($scope.selectedGoods.indexOf(goods), 1);
            var notEmpty = ifcartempty();
            $scope.empty = !notEmpty;
        }).error(function(data){
            Dialog.alert($scope, "商品删除失败！");
        });
    };
    /**删除多个商品*/
    $scope.delCartGses = function(){
        if($scope.selectedGoods.length == 0) return;
        CartService.delCartGses($scope.selectedGoods)
        .success(function(data){
            var olength = $scope.carts.orders.length;
            for(var i = olength - 1; i >= 0; i--){
                if(!$scope.carts.orders[i]) continue;

                var goods = $scope.carts.orders[i].goods;
                var glength = goods.length;
                for(var j = glength - 1; j >= 0; j--){
                    if(goods[j] && ($scope.selectedGoods.indexOf(goods[j]) > -1)){
                        goods.splice(j, 1);
                    }
                }
                if(goods.length == 0){
                    $scope.carts.orders.splice(i, 1);
                }
            }
            $scope.selectedGoods = [];
            var notEmpty = ifcartempty();
            $scope.empty = !notEmpty;
        }).error(function(data){
            Dialog.alert($scope, "商品删除失败！");
        });
    };

    $scope.clearCarts = function(){
        CartService.clearCarts();
        $scope.carts = {};
        $scope.selectedGoods = [];
        var notEmpty = ifcartempty();
        $scope.empty = !notEmpty;
    };

    $scope.goodsCount = function(){
        return ($scope.selectedGoods)? $scope.selectedGoods.length : 0;
    }

    $scope.goodsPrice = function(){
        var price = 0;
        if(!$scope.selectedGoods) return 0;
        for (var i = 0; i < $scope.selectedGoods.length; i++) {
            var goods = $scope.selectedGoods[i];
            price += ((goods.pprice?goods.pprice: goods.price) * goods.count);
        };
        return price;
    }

    $scope.countup = function(goods, cart){
        if(goods.stock <= 0){
            return;
        }
        if(goods.stock == goods.count){
            return;
        }
        goods.count = Number(goods.count) + 1;
        CartService.countupdate(goods.id, goods.count);
    };

    $scope.countdown = function(goods, cart){
        if(goods.count <= 1) {
            //$scope.delCartGs(goods, cart);
            return;
        }
        if(goods.stock <= 0){
            return;
        }
        goods.count = Number(goods.count) - 1;
        CartService.countupdate(goods.id, goods.count);
    };

    $scope.countupdate = function(goods, cart){
        if(goods.stock <= 0){
            goods.count = 0;
            return;
        }
        if(goods.count > goods.stock){
            goods.count = goods.stock;
            CartService.countupdate(goods.id, goods.count);
            return;
        }
        if(goods.count < 1){
            goods.count = 1;
            CartService.countupdate(goods.id, goods.count);
            return;
        }

        CartService.countupdate(goods.id, goods.count);
    };

    var orderExists = function(mid, orders){
        angular.forEach(orders, function(order, index){
            if(order.mid == mid) return order;
        });
        return null;
    };
    var hasGoods = function(order){
        var goods = order.goods;
        var has = false;
        angular.forEach(goods, function(singleGoods, index){
            if(singleGoods.selected){
                has = true;
                return;
            }
        });
        return has;
    };
});
