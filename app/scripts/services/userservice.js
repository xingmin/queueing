define(['./module'],function(services,$){
    'use strict';
	services.factory("userService",['$http',function($http){
	  return{
		  getAllUsers:function(){
			  return $http.get('/queue/user/');
		  },
		  delUser:function(id){
			  return $http.post('/queue/user/delete/', {'id':id});
		  },
		  createNewUser:function(name, loginid, password, empcode){
			  return $http.post('/queue/user/create/', {'name':name,
				  'loginid':loginid,
				  'pwd':password,
				  'empcode':empcode});
		  },
		  saveChangeUser:function(id, name, loginid, password, empcode){
			  return $http.post('/queue/user/update/', {'id':id, 
				  'name':name,
				  'loginid':loginid,
				  'pwd':password,
				  'empcode':empcode}); 
			  }
		  ,
		  getUserInfoByPwd:function(loginid, password){
			  return $http.post('/queue/user/querybypwd/', {
				  'loginid':loginid,
				  'pwd':password}); 
		 }
	};
	}])
})

