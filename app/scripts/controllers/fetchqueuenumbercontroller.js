define(['./module'],function(controllers){
    'use strict';
    controllers.controller('fetchQueueNumberController',
    		['$scope','$http','$timeout','socketService','queueService','queueClassService','indexedDbService',
    		function($scope,$http,$timeout, socketService,queueService,queueClassService,indexedDbService){
    	$scope.config={queueClasses:null,
    			currentQueueClass:null,
    			changeCurrent:function(queueclass){
    				$scope.config.currentQueueClass = queueclass;    			 
    				indexedDbService.setAppConfig('current-queue-class',{id:$scope.config.currentQueueClass.id,
    																		name:$scope.config.currentQueueClass.name})
    					.then(
    							function(){
    								console.log('ok')
    							},
    							function(){console.log('failed!')}
    						);    					 
    				 
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
