'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopApp.service('MyMessageService', function ($http, $location,ApiService){
	//已读数量
	this.getReadAmount = function(uid){
		return $http.get(ApiService.api.message.readAmount.replace(':uid',uid));
	} 
	//未读数量
	this.getUnReadAmount = function(uid){
		return $http.get(ApiService.api.message.unreadAmount.replace(':uid',uid));
	} 
	//消息列表
	this.list = function(uid, from, size){
		return $http.get(ApiService.api.message.list.replace(':uid',uid).replace(':from',from).replace(':size',size));
	} 

	//读取详情
	this.getDetail = function(id){
		return $http.get(ApiService.api.message.detail.replace(':id',id));
	}

 	//标记为已读
 	this.readMesages = function(ids){
		return $http.put(ApiService.api.message.refreshReadStatus.replace(':ids',ids).replace(':read',true));
	}

 	//删除
 	this.delete = function(ids){
		return $http.delete(ApiService.api.message.delete.replace(':ids',ids));
	}



});