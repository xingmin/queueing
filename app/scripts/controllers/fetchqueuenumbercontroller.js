define(['./module'],function(controllers){
    'use strict';
    controllers.controller('fetchQueueNumberController',
    		['$scope','$http','$timeout','socketService','queueService','queueClassService',
    		function($scope,$http,$timeout, socketService,queueService,queueClassService){
    	$scope.config={queueClasses:null,
    			currentQueueClass:null,
    			changeCurrent:function(queueclass){
    				$scope.config.currentQueueClass = queueclass;
    	}};
    	queueClassService.getAllQueueClasses().success(function(data){
    		$scope.config.queueClasses = data.value;
    	});
    	$scope.msgs=[];
    	$scope.queues=null;
    	$scope.selectedQueue = null
    	$scope.selectQueue = function(queue){
    		$scope.selectedQueue = queue;
    	}
    	
    	queueService.getQueueInfoByClassId(67).success(function(data){
			if(data.status==0 && data.value){
				$scope.queues = data.value
			}
		});
    	socketService.emit('myownevent','dd',function(){
    		$scope.msgs.push('test')
    	});

 
    }]);
})
