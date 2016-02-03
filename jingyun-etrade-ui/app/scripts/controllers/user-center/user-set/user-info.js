'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
 shopApp.controller('UserinfoController', function ($scope,Dialog,ModifyMobileService,UserinfoService,AreaService,$location) {


     $scope.educations = [
                {value:1,education:'博士后'},
                {value:2,education:'博士'},
                {value:3,education:'硕士'},
                {value:4,education:'本科'},
                {value:5,education:'专科'},
                {value:6,education:'其他'}
        ];

        $scope.jobs = [
            {value:1,job:'白领'},
            {value:2,job:'蓝领'},
            {value:3,job:'公务员'},
            {value:4,job:'教师'},
            {value:5,job:'其他'}
        ]; 
          $scope.incomes = [
            {value:1,income:'1000/月'},
            {value:2,income:'1000-3500/月'},
            {value:3,income:'3500-5000/月'},
            {value:4,income:'更多'}
           
        ];
 		ModifyMobileService.listUser().success(function(data){
 				$scope.user = data.body;
 		});

        UserinfoService.getUserinfo().success(function(data){
            if(data.code==200){
                $scope.getProvince(data.body.country, data.body.province);
                $scope.getCity(data.body.province, data.body.city);
                $scope.userinfo = data.body;
                $scope.userinfo.education = data.body.education;
                $scope.userinfo.job = data.body.job;
                $scope.userinfo.income = data.body.income;

              
                var pinjie = data.body.birthday;
                if(pinjie!=null){
                    $("#year").val(pinjie.substring(0,4));
                   var month = parseInt(pinjie.substring(5,7));
                    $("#month").val(month);
                    var day=parseInt(pinjie.substring(9,11));
                    $("#day").val(day);
                 };
            };
            
        });
       
 		$scope.saveuserinfo = function(userinfo){
            if($("#year").val()!= $("#month").val()){
                 $scope.userinfo.birthday=$("#year").val()+'-'+$("#month").val()+'-'+$("#day").val();

            }else{
                 $scope.userinfo.birthday=null;
            };
            if($scope.userinfo.gender==1){
                $scope.userinfo.gender="true";
            }else{
                $scope.userinfo.gender="false";
            };
            if($scope.userinfo.marriage==1){
                $scope.userinfo.marriage="true";
            }else{
                 $scope.userinfo.marriage="false";
            };
           
 			UserinfoService.saveUserinfo(userinfo).success(function(response){
                if(response.code==200){
                   Dialog.success($scope, "个人资料修改成功");
                }else{
                   Dialog.alert($scope, response.message);
                };
            });
       
 		};
 	
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
                            $scope.userinfo.province = provinceID;
                        };
                    };
                    
                });
            };
            
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
                            $scope.userinfo.city = cityID;
                        };
                    };
                    
                });
            };
            
        };
          
         
       
     
    function getobj(id){

        return document.getElementById(id);

    };

    function febday(){//判断不同的情况下二月的天数，并更改日的列表项中的内容
        var year=getobj('year').value;

        var month=getobj('month').value;

        var bigm=new Array('1','3','5','7','8','10','12');

        var bigstr=bigm.join('-');

        var smallm=new Array('4','6','9','10');
        var smallstr=smallm.join('-');

        if(bigstr.indexOf(month)>-1)

        addlist('day',1,31);

        if(smallstr.indexOf(month)>-1)

        day(30);

        if(month=='2'){

            if(isRui(year)){
                day(29);
                }else{
                day(28);
            };

        };

    };
   
    function day(num){//改变二月的天数

        var list=getobj('day');
        var listlen=list.options.length;
        for(var i=listlen-1;i>=num;i--){
        list.options[i]=null;

        };

    };

    function isRui(year){//是否是闰年

        if((year%400==0)||(year%4==0 && year/100!=0))
        return true;
        return false;

    };
   function addlist(obj,begin,length){//为列表项中批量添加项目

        var list=getobj(obj);
        for(var i=0;i<length;i++){
        var num=i+begin;
        list.options[i]=new Option(num,num);


        };
    };
        var date=new Date();
        var le1=date.getFullYear()-1970;
        addlist('year',1970,le1);
        addlist('month',1,12);
        addlist('day',1,31);

 });
