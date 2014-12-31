'use strict';
angular.module('app').controller('configqueue',['$scope','$http',function($scope,$http){
	$scope.queues = [{id:1,name:'测试1',maxcalltimes:2},
	                 {id:2,name:'测试2',maxcalltimes:3},
	                 {id:2,name:'测试2',maxcalltimes:4}]
	$scope.showEdit = true;
	$scope.master={};
	
}]);