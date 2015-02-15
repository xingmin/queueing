define(['./module'],function(controllers,$){
    'use strict';
    controllers.controller('chooseWindowController',['$scope','$http','$timeout','windowService',function($scope,$http,$timeout, windowService){
    	$scope.callWindows =null;
    	$scope.currentWindow = null;
    	$scope.msgs=[];
    	windowService.getUserAvilableWindowDetail(2).success(function(data){
    		$scope.callWindows = data.value;
    	});
    	$scope.activeWindow = function(current){
    		$scope.callWindows.forEach(function(win){
    			win.isactive=false;
    			if(win == current){
    				win.isactive = true;
    				$scope.currentWindow = win;
    			}
    		});
    	}
    	$scope.saveActiveWindow = function(){    	 
			windowService.activeUserWindow(2, $scope.currentWindow.id)
				.success(function(data){
					if(data.status==0){ 
						$scope.msgs.push('保存设置成功！');
					}else{
						$scope.msgs.push('保存设置失败！');
					}
			});
		 
    	};
 
 
    }]);
})
