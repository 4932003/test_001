'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('CartService', function ($http, ApiService, $cookies, ConstantService) {
    this.listCarts = function(uid){
        return $http.get(ApiService.api.cart.list.replace(':uid', uid));
    };
    this.submit = function(carts){
        return $http.post(ApiService.api.cart.submit, 
                    carts, 
                    {headers:{'Content-Type': 'application/json;charset=UTF-8'}});
    };
    /**
    删除购物车中的多个商品
    */
    this.delCartGses = function(goods){
        var goodsids = [];
        for(var i = 0; i < goods.length; i++){
            goodsids.push(goods[i].id);
        }
        return $http.delete(ApiService.api.cart.delete, {params: {'gids': goodsids}});
    };

    this.clearCarts = function(){
        $cookies.remove(ConstantService.LOGIN_CART_ID_KEY);
        var loginuid = $cookies.get(ConstantService.LOGIN_ID_KEY);
        var success = false;
        if(loginuid){
            $http.delete(ApiService.api.cart.clear.replace(':uid', loginuid));
        }

    };

    this.countupdate = function(id, count){
        var carts = $cookies.get(ConstantService.LOGIN_CART_ID_KEY);
        if(carts){
            console.log(carts);
        }
        $http.post(ApiService.api.cart.countupdate.replace(':id', id), $.param({'count':count}), {headers:{'Content-Type':'application/x-www-form-urlencoded'}});
    };

    this.addToCart = function(goods){
        return $http.post(ApiService.api.cart.addtocart, goods, {headers:{'Content-Type': 'application/json;charset=UTF-8'}});
    };
});
