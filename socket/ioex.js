var QueueClass = require('../models/queue/queueclass'); 
var Person = require('../models/queue/person'); 

var ioex = function(io){
	io.on('connection',function(socket){
		console.log('a user connect')
		socket.emit('news', {hello:'world'});
		socket.on('myownevent', function(data){
			console.log(data);
		});
		//叫号
		socket.on('fetch-queue-number', function(data){
			var queueId = null;
			var personExternalId = null;
			var promise = QueueClass.prototype.getQueueClassByQueueId(queueId);
			promise = promise.then(function(queueClass){	
				if(queueClass.mode == 0){
					//简单模式	
				
				}else if(queueClass.mode == 1){
					//复杂模式	
					
				}
			}
			,function(err){
				console.log('inerect with dbserver failed.')
			});
			console.log(data);
		});
		socket.on('disconnect', function(){
			console.log('user disconnecte.');
		});
	});	
};

module.exports = ioex;