
'use strict';//基础类 查询JSON数组大小
var BaseUtil = function() {};
BaseUtil.getJsonArrSize = function(jsonData) {
	var jsonLength = 0;
	for(var item in jsonData){
	jsonLength++;
	}
	return jsonLength;
};

