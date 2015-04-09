define(['./module'],function(controllers){
	'use strict';
	controllers.controller('callPersonController',
			['$scope','$http','$timeout', '$q',
			'userService', 'socketService', 'queueService',
			'ticketService','dictService',
			function($scope, $http, $timeout, $q,
					userService, socketService, queueService,
					ticketService, dictService){
		$scope.currentUser = userService.getCurrentUser();
		$scope.msgs=[];
		$scope.queues = [];
		$scope.dictQueueStatus = [];
		dictService.getQueueStatus()
			.then(
					function(recv){
						$scope.dictQueueStatus = recv.data.value;
					}
			);
		queueService.getUserAvilableQueueDetail($scope.currentUser.id)
			.then(
					function(recv){
						if(recv.data.status === 0){
							$scope.queues = recv.data.value;
						}
						return $scope.queues;
					}
			)
			.then(
					function(queues){
						//获取每个队列当前正在排队的列表
						queues.forEach(function(queue){
							ticketService.getQueuingTicketsByQueueId(queue.id)
								.then(
									function(recv){
										queue.tickets = recv.data.value;
									},
									function(err){
										$scope.msgs.push(err.message);
									}
								);
						});
					},
					function(err){
						$scope.msgs.push(err.message);
					}
			);
	}]);
});
