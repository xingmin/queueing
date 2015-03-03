define(['./module'],function(controllers){
    'use strict';
    controllers.controller('fetchQueueNumberController',
    		['$scope','$http','$timeout','socketService','queueService','queueClassService','indexedDbService',
    		function($scope,$http,$timeout, socketService,queueService,queueClassService,indexedDbService){
    	$scope.msgs=[];
    	$scope.queues=null;
    	$scope.selectedQueue = null;
    	$scope.getQueuesByCurrentClassId = function(){
			if($scope.config.currentQueueClass){
		    	queueService.getQueueInfoByClassId($scope.config.currentQueueClass.id).success(function(data){
					if(data.status==0 && data.value){
						$scope.queues = data.value
					}
				});
			}
    	};
    	$scope.config={queueClasses:null,
    			currentQueueClass:null,
    			changeCurrent:function(queueclass){
    				$scope.config.currentQueueClass = queueclass;    			 
    				indexedDbService.setAppConfig('current-queue-class',{id:$scope.config.currentQueueClass.id,
    																		name:$scope.config.currentQueueClass.name})
    					.then(
    							function(){
    								console.log('保存配置成功！')
    								$scope.getQueuesByCurrentClassId();
    							},
    							function(){console.log('failed!')}
    						);    					 
    				 
    	}};
    	queueClassService.getAllQueueClasses().success(function(data){
    		$scope.config.queueClasses = data.value;
			indexedDbService.getAppConfig('current-queue-class')
				.then(
					function(data){
						$scope.config.queueClasses.forEach(function(val){
							if(val.id === data.id){
								$scope.config.currentQueueClass = val;
							}
						});
						$scope.getQueuesByCurrentClassId();
					},
					function(){console.log('failed!')}
					);  
    			});

    	$scope.selectQueue = function(queue){
    		$scope.selectedQueue = queue;
    	}    	

    	socketService.emit('myownevent','dd',function(){
    		$scope.msgs.push('test')
    	});

 
    }]);
})
