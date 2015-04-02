define(['./module'],function(controllers){
    'use strict';
    controllers.controller('fetchQueueNumberController',
    		['$scope','$http','$timeout','socketService','queueService','queueClassService','indexedDbService',
    		function($scope,$http,$timeout, socketService,queueService,queueClassService,indexedDbService){
    	$scope.msgs=[];
    	$scope.externalPersonId=null;
    	$scope.queues=null;
    	$scope.selectedQueue = null;
    	//对socket进行监听配置 
    	(function(){
    		socketService.on('fetch-num-result',function(result){
    			if(result.status===0){
    				console.log('fetch number succeeded.')
    			}else{
    				console.log('fetch number failed.');
    			}
    		})})();
    	
    	//根据当前的对列类别取得其包含的队列
    	$scope.getQueuesByCurrentClassId = function(){
			if($scope.config.currentQueueClass){
		    	queueService.getQueueInfoByClassId($scope.config.currentQueueClass.id).success(function(data){
					if(data.status==0 && data.value){
						$scope.queues = data.value
					}
				});
			}
    	};
    	//根据选择的当前队列类别初始化页面数据
    	$scope.initContext = function(){
    		$scope.getQueuesByCurrentClassId();
        	socketService.emit('join-room',
        			'fetchnum:'+$scope.config.currentQueueClass.id,
        			function(stat){ 
        		if(stat.status==0){
        			console.log('join-room-result:'+stat.message)
        		}
        	});
    	};
    	//选择的当前队列类别保存至本地
    	$scope.config={queueClasses:null,
    			currentQueueClass:null,
    			changeCurrent:function(queueclass){
    				$scope.config.currentQueueClass = queueclass;    			 
    				indexedDbService.setAppConfig('current-queue-class',{id:$scope.config.currentQueueClass.id,
    																	name:$scope.config.currentQueueClass.name,
    																	mode:$scope.config.currentQueueClass.mode})
    					.then(
    							function(){
    								console.log('save configuration succeeded！')
    								$scope.initContext();
    							},
    							function(){console.log('failed!')}
    						);    					 
    			}
    	};
    	//初始化页面的队列类别列表数据
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
						$scope.initContext();
					},
					function(){console.log('failed!')}
					);  
    			});

    	$scope.selectQueue = function(queue){
    		$scope.selectedQueue = queue;
    	};      	
    	$scope.fetchQueueNumber = function(queueid){
        	socketService.emit('fetch-num',{queueId:queueid, externalPersonId:$scope.externalPersonId},function(stat){
        		if(stat.status==0){
        			console.log('join-room-result:'+stat.message)
        		}
        	});
    	};  
    }]);
})
